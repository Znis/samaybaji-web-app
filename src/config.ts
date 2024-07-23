import dotenv from 'dotenv';

dotenv.config();
const pathToEnv = __dirname + "/../.env";

dotenv.config({ path: pathToEnv });

const config = {
    port: process.env.PORT,
}

export default config;