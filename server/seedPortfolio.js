const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const config = require('../config/config');
const Project = require('./models/project');
const Education = require('./models/education');

async function seedPortfolio() {
    if (!config.mongoUri) throw new Error('MONGO_URI is missing in .env');

    await mongoose.connect(config.mongoUri);

    if (await Project.countDocuments() === 0) {
        await Project.insertMany([
            {
                title: 'Cloud Kitchen Database',
                firstname: 'Dhruvin',
                lastname: 'Suvagiya',
                description: 'A database project developed using SQL to manage menus, orders, customers, and inventory. My role was Project Lead in a team of three. Created a functional database structure for managing a cloud kitchen.'
            },
            {
                title: 'GPA Calculator Web App',
                firstname: 'Dhruvin',
                lastname: 'Suvagiya',
                description: 'A web application designed to calculate grades using weighted assignments and course marks. My role was Developer. Created a working calculator that calculates grades based on user input.'
            },
            {
                title: 'One Piece Fan Website',
                firstname: 'Dhruvin',
                lastname: 'Suvagiya',
                description: 'A fan website created to practice web development and present information about the One Piece series. My role was Web Developer. Created a structured website with multimedia content and multiple sections.'
            }
        ]);
        console.log('Original portfolio projects added to MongoDB.');
    } else {
        console.log('Projects collection already contains data. No project records were added.');
    }

    if (await Education.countDocuments() === 0) {
        await Education.insertMany([
            {
                title: 'Centennial College',
                firstname: 'Dhruvin',
                lastname: 'Suvagiya',
                description: 'Software Engineering Technology - Artificial Intelligence. Currently studying software development, artificial intelligence, databases, web development, and programming.'
            },
            {
                title: 'Professional Development',
                firstname: 'Dhruvin',
                lastname: 'Suvagiya',
                description: 'Programming and Software Development. Developing skills in Java, C#, Python, SQL, JavaScript, React, Git, and web application development.'
            }
        ]);
        console.log('Original education entries added to MongoDB.');
    } else {
        console.log('Qualifications collection already contains data. No education records were added.');
    }

    await mongoose.disconnect();
}

seedPortfolio().catch(async (error) => {
    console.error('Could not seed portfolio data:', error.message);
    await mongoose.disconnect();
    process.exit(1);
});
