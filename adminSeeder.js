const mongoose = require('mongoose');
const User = require('./user/user.model')

mongoose.connect('mongodb://localhost/demo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        seedAdmin();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


async function seedAdmin() {
    try {
     
        const existingAdmin = await User.findOne({ role: 'admin' });

        if (!existingAdmin) {
            const adminData = {
                name: 'admin',
                email: 'admin@yopmail.com',
                password: '$2a$10$HJHAzoMr0KFca97T5TKBluesAB1ZQ.N5z2osCs3BnLS35FHJABvty',
                dept:'Admin',
                role:'admin'
            };
            await User.create(adminData);
            console.log('Admin user seeded successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
     
        mongoose.connection.close();
    }
}
