# Live Site: https://mhs-inventory.netlify.app

## Backend Server: https://inventory-420.vercel.app

# Features

1. Authentication - Register new account and login into existing account
2. Create Product - Create new product with various information
3. Manage product -
   - View All Product of login user
   - filter and search using different fields
   - pagination
   - update existing product
   - delete existing product
   - create new variant of product
   - sell that product
4. Manage sale -
   - View all sale with pagination
   - update sale data
   - delete sale data
5. Sale history - View sales history categorized by:
   - Yearly
   - Monthly
   - Weekly
   - Daily

## Instruction to run the application local

- Step 1: create a `.env` file at root of the directory and include the environment variables as following bellow

  ```bash
    NODE_ENV=dev
    PORT=5000
    DATABASE_URL=
    JWT_SECRET=your_jwt_secret
  ```

- Step 2: install all the dependencies using the command
  ```bash
    npm install 
    #or 
    yarn
    #or
    pnpm instal
  ```
- Step 3: run the development server using the command

  ```bash
    npm run dev
  ```

  or run the production server using the commands

  ```bash
    # at first build the production server
    npm run build

    #then
    npm start
  ```
