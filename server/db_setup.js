const { Pool } = require('pg');
require('dotenv').config(); // Loads the variables from your .env file

// Create a new connection pool using your Neon connection string
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Neon requires SSL connections
    }
});

// A quick test to confirm the connection works when the server starts
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Successfully connected to Neon Database!');
    release(); // Release the client back to the pool
});

module.exports = pool;