const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/users')
const fx = require('./routes/fx')

// Import API Routes
app.use(users)
app.use(fx)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
