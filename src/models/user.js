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
            phone: { type: String, required: true },
            imgUrl: { type: String, required: true },
            role: { type: String, required: true },
            address: String
        }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
)

const User = mongoose.Users || mongoose.model("Users", UserSchema);

export default User;