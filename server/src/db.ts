import { Error } from "mongoose";
import models from "./models";

const mongoose = require('mongoose');

module.exports = {
    connect: (DB_HOST: string) => {
        mongoose.connect(DB_HOST);
        mongoose.connection.on('error', (err: Error) => {
            console.error(err);
            console.log(
                'MongoDB connection error. Please make sure MongoDB is running.'
            );
            process.exit();
        });
    },

    close: () => {
        mongoose.connection.close();
    },

    reset: () => {
        models.User.updateMany({}, { $set: { sessionExpiration: new Date(0) } });
    }
};