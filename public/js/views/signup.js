// Assuming you have already set up your Express app and connected to MongoDB

// Import required modules
const express = require('express');
const router = express.Router();
const Account = require('./models/account');
const Role = require('./models/role');

// Define the POST /signup route
router.post('/signup', async (req, res) => {
    // Extract signup data from the request body
    const { name, email, user, pass, country } = req.body;

    try {
        // Check if email or username is already taken
        const existingEmail = await Account.findOne({ email });
        const existingUsername = await Account.findOne({ user });

        if (existingEmail) {
            return res.status(400).json({ error: 'email-taken' });
        }

        if (existingUsername) {
            return res.status(400).json({ error: 'username-taken' });
        }

        // Create a new user document
        const newUser = new Account({
            name,
            email,
            user,
            pass,
            country
        });

        // Save the user document to MongoDB
        await newUser.save();

        // Optionally, create a role document for the user
        const newRole = new Role({
            // Role details
        });
        // Save the role document to MongoDB
        await newRole.save();

        // Return a success response
        res.status(200).send('ok');
    } catch (error) {
        // Handle any errors that occur during signup
        console.error('Error creating user:', error);
        res.status(500).send('error-creating-user');
    }
});

// Export the router
module.exports = router;
