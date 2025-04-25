const { Client } = require("pg");

// 1. Connect to PostgreSQL
const client = new Client({
  connectionString: "postgres://localhost/acme_vacay_db",
});

client.connect();

// 2. Export your client and queries
module.exports = {
  client,

  // Creates the customers, restaurants, and reservations tables
  createTables: async () => {
    const SQL = `
      DROP TABLE IF EXISTS reservations;
      DROP TABLE IF EXISTS customers;
      DROP TABLE IF EXISTS restaurants;

      CREATE TABLE customers (
        id UUID PRIMARY KEY,
        name VARCHAR(255)
      );

      CREATE TABLE restaurants (
        id UUID PRIMARY KEY,
        name VARCHAR(255)
      );

      CREATE TABLE reservations (
        id UUID PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
        customer_id UUID REFERENCES customers(id) NOT NULL
      );
    `;
    await client.query(SQL);
  },

  // Query to fetch all customers
  fetchCustomers: async () => {
    const result = await client.query("SELECT * FROM customers");
    return result.rows;
  },

  // Query to fetch all restaurants
  fetchRestaurants: async () => {
    const result = await client.query("SELECT * FROM restaurants");
    return result.rows;
  },

  // Query to fetch all reservations
  fetchReservations: async () => {
    const result = await client.query("SELECT * FROM reservations");
    return result.rows;
  },
};
