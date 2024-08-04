# Samaybaji: A Platform for Newari Cuisine

## Overview

**Samaybaji** is a fullstack web application dedicated to Newari cuisine. It is built using HTML, CSS/Sass, and TypeScript for the frontend, Node.js for the backend, and Minio for media image storage. The platform allows users to log in as customers to browse the menu and place orders. Customers can also create a restaurant profile and add their own menus and menu items. Additionally, users can view dish details, rate them, and leave reviews.

## Features

- **Authentication**: Secure login for users.
- **Menu Browsing**: Browse various dishes and menus.
- **Order Placement**: Place orders from multiple restaurants.
- **Restaurant Profiles**: Customers can create and manage their own restaurant profile.
- **Add Menu Items**: Add, update, and delete menu items.
- **Dish Details**: View detailed information about dishes.
- **Ratings and Reviews**: Rate dishes and leave reviews.

## Roles and Permissions

Samaybaji has three roles, each with its own set of permissions and dashboards:

1. **Customer**:
   - Browse menus and dishes.
   - Place orders.
   - View and update their profile.
   - Rate and review dishes.

2. **Customer with Restaurant**:
   - All the permissions of a customer.
   - Create and manage their restaurant profile.
   - Add, update, and delete menu items.
   - View and manage orders for their restaurant.

3. **Super Admin**:
   - View and remove the users.

Each role has a dedicated dashboard tailored to its specific permissions and functionalities.

## Technologies Used

- **Frontend**: HTML, CSS/Sass, TypeScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Storage**: MinIO for storing media images
- **Authentication**: JWT (JSON Web Tokens)

## Installation

To set up the project locally, follow these steps:  
### Frontend
Make sure you have Node.js and npm installed on your machine.    

Clone the repository.  
*Configure the backend node server url in the src/api-routes/base.ts.*  

Run the following command from project root directory.
1. **Switch to frontend-main branch (default)**
   ```bash
   git checkout frontend-main
   ``` 
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

### Backend
Make sure you have Node.js and npm and docker installed on your machine.  

Clone the repository.

#### Configuration
1. **Environment Variables**: Create a `.env` file in the project root directory and configure the necessary environment variables. Refer to the `.env.example` file for required variables.    
Set the 'MINIO_ENDPOINT' in the `.env` file as `localhost` for locally running the bucket.    
Set the 'DB_NAME' in the `.env` file as `samaybaji` and 'DB_CLIENT' as `pg` for creating the database.   If not, please change the desired db name in the `create_db.sql` file at the root directory as well.    


2. **Docker Compose**: The `docker-compose.yml` file is already configured to set up the necessary services (PostgreSQL, and MinIO). Adjust the configuration as needed using `.env`.


Run the following command from project root directory.
1. **Switch to backend-main branch**
   ```bash
   git checkout backend-main
   ``` 
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the database (postgres) and media storage (minio) services by docker compose:

    ```bash
    docker compose up
    ```
4. Run the migrations:

    ```bash
    npm run migrate
    ```
5. Seed the database:

    ```bash
    npm run seed
    ```
6. Start the server:

    ```bash
    npm start
    ```

## Contributing

Feel free to contribute by submitting issues or pull requests. Please follow the project's code of conduct and adhere to the coding standards outlined in the repository.
