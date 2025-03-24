# Wholesaler-Retailer API

A Node.js API for managing wholesaler-retailer relationships and stock transactions.

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- MVC Architecture

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
```bash
git clone https://github.com/syedahmedullah14/wholesaler-retailer-api.git
cd wholesaler-retailer-api
```

2. Install dependencies
```bash
npm install
```

3. Create PostgreSQL database
```bash
createdb wholesaler
```

4. Configure environment variables
Copy the `.env.example` file to `.env` and update the values according to your PostgreSQL configuration:
```bash
cp .env.example .env
```

5. Edit the `.env` file:
```
PORT=3000
DB_NAME=wholesaler
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

## Running the Application

1. Start the server
```bash
npm run start
```

2. For development with auto-restart:
```bash
npm run dev
```

3. To seed the database with sample data:
```bash
node src/config/seed.js
```

## API Endpoints

### Wholesalers
- `GET /api/wholesalers/:id/retailers` - Get wholesaler with associated retailers
- `GET /api/wholesalers/monthly-turnover` - Get monthly turnover for each wholesaler
- `GET /api/wholesalers/max-turnover` - Get max turnover from a single retailer for each wholesaler

### Retailers
- `GET /api/retailers/single-wholesaler` - Get retailers with only one wholesaler

## Database Schema

### Tables
1. `wholesalers` - Stores wholesaler information
   - id (PK)
   - name
   - mobile_number
   - createdAt
   - updatedAt

2. `retailers` - Stores retailer information
   - id (PK)
   - name
   - mobile_number
   - createdAt
   - updatedAt

3. `wholesaler_retailer` - Junction table for many-to-many relationship
   - wholesalerId (FK)
   - retailerId (FK)
   - createdAt
   - updatedAt

4. `stocks` - Stores stock transactions
   - id (PK)
   - wholesaler_id (FK)
   - retailer_id (FK)
   - stock_amount
   - date
   - createdAt
   - updatedAt

## Project Structure

```
wholesaler-retailer-api/
├── src/
│   ├── config/
│   │   ├── db.config.js
│   │   └── seed.js
│   ├── controllers/
│   │   ├── retailer.controller.js
│   │   └── wholesaler.controller.js
│   ├── models/
│   │   ├── index.js
│   │   ├── retailer.model.js
│   │   ├── stock.model.js
│   │   └── wholesaler.model.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── retailer.routes.js
│   │   └── wholesaler.routes.js
│   ├── services/
│   │   ├── retailer.service.js
│   │   └── wholesaler.service.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```
