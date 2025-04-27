const express = require("express");
const app = express();

// 1. Import database functions
const {
  client,
  createTables,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
} = require("./db");

app.use(express.json());

// 2. Route to create tables
app.get("/setup", async (req, res, next) => {
  try {
    await createTables();
    res.send("Tables created!");
  } catch (err) {
    next(err);
  }
});

// 3. Route to GET all customers
app.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

// 4. Route to GET all restaurants
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await fetchRestaurants();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});

// 5. Route to GET all reservations
app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservations = await fetchReservations();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
});

// 6. Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// 7. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
