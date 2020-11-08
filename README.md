# TECHPROSHOP

🚀💪🏽This project is deployed at: [techproshop.herokuapp.com/](http://techproshop.herokuapp.com/)

e-commerce platform for people to buy, sell, and review electronics at great prices. Built with MERN + Redux stack.

- Global users can browse products and add to cart.
- Users can order at checkout, save their shipping and payment methods (credit card or paypal), and can review and rate products.
- Admins can manage all products, users, and orders.

## Project Features and Scope

- Full featured shopping cart

- Product reviews and ratings

- Top products carousel

- Product pagination

- Product search feature

- User profile with orders

- Admin product management

- Admin user management

- Admin Order details page

- Mark orders as delivered option

- Checkout process (shipping, payment method, etc)

- PayPal / credit card integration

- Database seeder (products & users)

## Packages and technologies used

Backend:

- MongoDB

- Mongoose

- Express

- Node.js

- concurrently

- nodemon

- colors

Frontend:

- axios

- react

- redux

- react-bootstrap

- react-router-bootstrap

- react-router-dom

- react-scripts

- react-helmet

---

## App Demo

### Global User:

- browse paginated products / products carousel,
- view product, must be signed in to give product review
- add/edit/remove products to cart,
- must be signed in to place order

![Demo](https://raw.githubusercontent.com/sidbhanushali/TechProShop/master/demogifs/global-TechProShop.gif)

---

## Run This App Locally

### Install Dependencies (frontend & backend)

```

npm install

cd frontend

npm install



```

### ES Modules in Node

ECMAScript Modules are used in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

### Env Variables

Create a .env file in then root and add the following

```

NODE_ENV = development

PORT = 5000

MONGO_URI = your mongodb uri

JWT_SECRET = 'abc123'

PAYPAL_CLIENT_ID = your paypal client id



```

### Run

```

# Run frontend (:3000) & backend (:5000)

npm run dev



# Run backend only

npm run server



```

## Build & Deploy

```

# Create frontend prod build

cd frontend

npm run build



```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```

# Import data

npm run data:import



# Destroy data

npm run data:destroy



```

```

Sample User Logins



admin@example.com (Admin)

123456



john@example.com (Customer)

123456



jane@example.com (Customer)

123456

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
