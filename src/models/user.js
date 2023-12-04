import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true},
        lastName: { type: String, required: true },
        email: { 
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Invalid email address'
            },
            phone: String,
            role: String,
            address: String,
            photoUrl: String
        }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
)

const User = mongoose.Users || mongoose.model("Users", UserSchema);

export default User;