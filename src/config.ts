import dotenv from 'dotenv';

dotenv.config();
const pathToEnv = __dirname + '/../.env';

dotenv.config({ path: pathToEnv });

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryS: 10000,
    refreshTokenExpiryS: 20000,
  },
  database: {
    client: process.env.DB_CLIENT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
  },
  minio: {
    MINIO_ROOT_USER: process.env.MINIO_ROOT_USER,
    MINIO_ROOT_PASSWORD: process.env.MINIO_ROOT_PASSWORD,
    MINIO_API_PORT: process.env.MINIO_API_PORT || 9000,
    MINIO_CONSOLE_PORT: process.env.MINIO_CONSOLE_PORT || 9001,
    MINIO_BUCKET_NAME: process.env.MINIO_BUCKET_NAME || 'samaybaji-images',
  },
};

export default config;
