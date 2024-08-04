import * as Minio from 'minio';
import config from './config';

const minioClient = new Minio.Client({
  endPoint: config.minio.MINIO_ENDPOINT!,
  port: +config.minio.MINIO_API_PORT,
  useSSL: false,
  accessKey: config.minio.MINIO_ROOT_USER!,
  secretKey: config.minio.MINIO_ROOT_PASSWORD!,
});

export const bucketName = config.minio.MINIO_BUCKET_NAME;

/**
 * Checks if a bucket exists in the Minio server and creates it if it does not.
 *
 * @return {Promise<void>} A Promise that resolves when the bucket has been checked or created.
 */
async function makeBucket() {
  const exists = await minioClient.bucketExists(bucketName);
  if (exists) {
    console.log('Bucket Exists: ', bucketName);
  } else {
    await minioClient.makeBucket(bucketName);
    console.log('Bucket Created: ', bucketName);
  }
}

makeBucket();

export default minioClient;
