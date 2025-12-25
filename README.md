# Shoppy Globe Backend

This is the backend for Shoppy Globe, a e-commerce platform. It is built using Node.js and MongoDB.

## Links
- [Github](https://github.com/KiranNamawar/demo-shoppy-globe-backend)

## Setup

### Prerequisites

- Node.js (v20 or higher)
- MongoDB
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KiranNamawar/demo-shoppy-globe-backend.git
   cd demo-shoppy-globe-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database connection string and other required configurations.

### Docker Setup (optional)

4. Start the MongoDB container:
   ```bash
   npm run db:start
   ```

### Seeding the Database

5. Seed the database with sample products:
   ```bash
   npm run db:seed
   ```

### Starting the Server

6. Start the server:
   ```bash
   npm run start
   ```

## API Endpoints
- `GET /products` - Get all products
- `GET /products/:productId` - Get a single product
- `POST /register` - Register a new user
- `POST /login` - Login and get a JWT token

### Protected Endpoints
Requires AccessToken in Authorization header with Bearer prefix for following endpoints:
- `POST /cart` - Add a product to the cart
- `PUT /cart/:productId` - Update the quantity of a product in the cart
- `DELETE /cart/:productId` - Remove a product from the cart


## Error Handling

The API follows RESTful practices and returns appropriate HTTP status codes and error messages.
