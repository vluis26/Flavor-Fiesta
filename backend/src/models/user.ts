import { Schema, model, models, Model } from "mongoose";

interface IUser{
    _id?: string,
    email: string,
    password: string
}

const userSchema = new Schema<IUser>(
    {
        // What the email should have
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        // Similar to email
        password: { 
            type:String, 
            required: true, 
            select: false 
        },
    },
    {
        timestamps: true,
        autoIndex: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true},
    }
)

// Checks if a model named 'User' already exists; if not, it creates a new one.
export const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema)