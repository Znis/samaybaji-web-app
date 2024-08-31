import * as Minio from 'minio';
import config from './config';
import { exec } from 'child_process';

const minioClient = new Minio.Client({
  endPoint: config.minio.MINIO_ENDPOINT!,
  port: +config.minio.MINIO_API_PORT,
  useSSL: true,
  accessKey: config.minio.MINIO_ROOT_USER!,
  secretKey: config.minio.MINIO_ROOT_PASSWORD!,
});

export const bucketName = config.minio.MINIO_BUCKET_NAME;

/**
 * Runs the seed script using the npm command.
 *
 * @return {void} No return value, logs output to console.
 */
function runSeedScript() {
  console.log('Seeding...');
  exec('npm run seed', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running seed script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

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
    runSeedScript();
  }

}

makeBucket();

export default minioClient;
