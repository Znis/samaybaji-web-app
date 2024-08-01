import axios from 'axios';
import { StateManager } from './state-management/stateManager';
import { fetchAccessToken } from './api-routes/auth';

const baseUrl = 'http://localhost:8000';
const getUploadUrlRoute = `/upload-url/`;

export const getUploadUrl = async () => {
  return await axios
    .get(`${baseUrl}${getUploadUrlRoute}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const uploadImage = async (url: string, image: File) => {
  return await axios
    .put(`${url}`, {
      headers: {
        'Content-Type': image.type,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export async function makeApiCall<T extends unknown[]>(
  callbackFn: (...args: T) => Promise<Response>,
  ...args: T
) {
  try {
    return await callbackFn(...args);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.message === 'Token Expired') {
        const tokenResponse = await handleTokenExpiration();
        if (!tokenResponse.accessToken) {
          logoutUser();
          throw new Error(`Failed to refresh access token: ${tokenResponse}`);
        }
        StateManager.updateState('accessToken', tokenResponse.accessToken);
        try {
          return await callbackFn(...args);
        } catch (retryError) {
          if (axios.isAxiosError(retryError)) {
            console.error(
              'API Error:',
              retryError.response!.status,
              retryError.response!.statusText,
            );
            throw new Error(
              `API Error:
              ${retryError.response!.status} 
              ${retryError.response!.statusText}`,
            );
          }
          console.error('API Error:', retryError);
        }
      } else {
        console.error('API Error:', error);
        throw new Error(`${error}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error(`Unexpected Error: ${error}`);
    }
  }
}

async function handleTokenExpiration(): Promise<{
  accessToken: string | null;
}> {
  try {
    return await fetchAccessToken();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching access token:',
        error.response!.status,
        error.response!.statusText,
      );
      throw new Error('Error fetching access token');
    }
    console.error('Error fetching access token:', error);
    throw new Error('Error fetching access token');
  }
}

function logoutUser(): void {
  StateManager.resetState();
  console.warn('User logged out due to token expiration');
}
