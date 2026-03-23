require("dotenv").config();
const _ = require("underscore");

const OrganizationCategorySchema = require('./model/Organization.Schema');
const { default: mongoose } = require("mongoose");

const mySql = require('./mysql.connection').getInstance;
const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'emp-monitor.sql');

fs.readFile(filePath, { encoding: 'utf-8' }, async function (err, data) {
    if (!err) {
        try {
            console.log("=========MIGRATION ON PROCESS===============");
            await mySql.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE_NAME}`);
            mySql.end();

            const mySqlPrime = require('./mysql.connection').getInstanceDb;
            try {
                await mySqlPrime.query(data);
                mySqlPrime.end();
                await mongoose.connect(process.env.MONGO_URL)
                await OrganizationCategorySchema.insertData();
                console.log("=========MIGRATION COMPLETED===============");
                mySql.end();
                mySqlPrime.end();
            } catch (error) {
                console.log({ error })
                mySqlPrime.end();
            }
        } catch (error) {
            console.log({ error })
            mySql.end();
        }
    } else {
        console.log(err);
    }
});