# A full stack Inventory management system

### Live Site: https://inventory-navy.vercel.app

<!-- ### Backend Server: https://inventory-420.vercel.app -->

### Technologies

- **_Backend:_** TypeScript, Node.js, express.js, mongoDB, mongoose, zod
- **_Frontend:_** TypeScript, React, Redux-toolkit, Ant-design, zod, recharts, react-hook-form, sweetalert2, react-router-dom

# Features

1. Authentication - Register new account and login into existing account
2. Manage and update own profile page and change password
3. Create -
   - Create new product with various information
   - Create Seller
   - Create Product Category
   - Create Product Brand
4. Manage product -
   - View All Product of login user
   - filter and search using different fields
   - pagination
   - update existing product
   - delete existing product
   - create new variant of product
   - sell that product
5. Manage sale -
   - View all sale with pagination
   - update sale data
   - delete sale data
6. Manage seller -
   - View all seller with pagination
   - update seller data
   - delete seller data
7. Manage purchase -
   - View all purchase with pagination
   - update purchase data
   - delete purchase data
8. Sale history - View sales history categorized by:
   - Yearly
   - Monthly
   - Weekly
   - Daily

# Pages

<img src='./asset/1.png'>
<img src='./asset/2.png'>
<img src='./asset/3.png'>
<img src='./asset/4.png'>
<img src='./asset/5.png'>

### How to run application locally

1. Create a `.env` file to `client` folder and add the environment variable

```bash
   VITE_BASE_URL=http://localhost:8000/api/v1
```

2. Create a `.env` file to `server` folder and add the environment variable

```bash
   NODE_ENV=dev
   PORT=8000
   DATABASE_URL=  #### use your local mongodb URI or mongodb atlas URI
   JWT_SECRET=your_secret_key
```

3. Install the dependencies and run backend

```bash

   cd client # or go to server folder and open the terminal in this directory

   npm install

   # then

   npm run dev

```

4. Install the dependencies and run frontend

```bash

   cd client # or go to client folder and open the terminal in this directory

   npm install

   # then

   npm run dev

```
