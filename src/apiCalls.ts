import axios, { AxiosError } from 'axios';
import { StateManager } from './state-management/stateManager';
import { ICreateOrder } from './interfaces/order';
import { IAuthUser, ICreateUser } from './interfaces/users';
import ICartItem, {
  ICreateCartItemData,
  IEditCartItemData,
  IFormattedCartItemData,
} from './interfaces/cartItem';
import { ICreateRestaurant } from './interfaces/restaurant';

const baseUrl = 'http://localhost:8000';
const usersUrl = '/users';
const loginUrl = '/login';
const registerUrl = `${usersUrl}/register`;
const refreshUrl = '/refresh';
const restaurantUrl = '/restaurants';
const menuUrl = '/menus/all';
const cartUrl = '/carts';
const cartItemsUrl = '/cart-items';
const addCartItemUrl = `${cartItemsUrl}/add`;
const removeCartItemUrl = `${cartItemsUrl}/delete`;
const editCartItemUrl = `${cartItemsUrl}/edit`;
const clearCartUrl = `${cartUrl}/clear`;
const createOrderUrl = `/orders/create`;
const getUploadUrlRoute = `/upload-url/`;
const ordersUrl = `/orders/`;
const menuItemsUrl = `/menus/`;
const createRestaurantUrl = `/restaurants/create`;

export const login = async (formData: IAuthUser) => {
  return await axios
    .post(`${baseUrl}${loginUrl}`, formData, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    });
};
export const register = async (formData: ICreateUser) => {
  return await axios.post(`${baseUrl}${registerUrl}`, formData).then((res) => {
    return res.data;
  });
};

export const fetchAllRestaurants = async () => {
  return await axios.get(`${baseUrl}${restaurantUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchAllMenus = async () => {
  return await axios.get(`${baseUrl}${menuUrl}`).then((res) => {
    return res.data;
  });
};
export const fetchCartItems = async () => {
  return await axios
    .get(`${baseUrl}${cartUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchAllOrders = async () => {
  return await axios
    .get(`${baseUrl}${ordersUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchAllMenuItems = async () => {
  return await axios
    .get(`${baseUrl}${menuItemsUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const addCartItem = async (cartItemData: ICreateCartItemData[]) => {
  return await axios
    .post(`${baseUrl}${addCartItemUrl}`, cartItemData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

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
export const removeCartItem = async (menuItemID: string) => {
  return await axios
    .delete(`${baseUrl}${removeCartItemUrl}`, {
      params: { menuItemID: menuItemID },
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const editCartItem = async (
  menuItemID: string,
  editCartItemData: IEditCartItemData,
) => {
  return await axios
    .patch(
      `${baseUrl}${editCartItemUrl}`,
      { quantity: editCartItemData.quantity },
      {
        params: { menuItemID: menuItemID },

        headers: {
          Authorization: `Bearer ${StateManager.state.accessToken}`,
        },
      },
    )
    .then((res) => {
      return res.data;
    });
};
export const clearCart = async () => {
  return await axios
    .delete(`${baseUrl}${clearCartUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const createOrder = async (orderData: ICreateOrder) => {
  return await axios
    .post(`${baseUrl}${createOrderUrl}`, orderData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const createRestaurant = async (restaurantData: ICreateRestaurant) => {
  return await axios
    .post(`${baseUrl}${createRestaurantUrl}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchAllUsers = async () => {
  return await axios
    .get(`${baseUrl}${usersUrl}`, {
      headers: {
        Authorization: `Bearer ${StateManager.state.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
export const fetchAccessToken = async () => {
  return await axios
    .post(
      `${baseUrl}${refreshUrl}`,
      {},
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
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
