import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        hubSpotUserId: {
            type: String,
            required: true
        },
        hubSpotPortalId: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        sessionExpiration: {
            type: Date,
            required: true
        },
        csrfSecret: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = model('User', userSchema);

export default User;