"use server"

import axios from "axios";

const userRegistration = async formData => {
    try {
        const response = await axios.post('https://tech-nest-repo.vercel.app/registerUser', formData);

        if (response.data.success) {
            // User created successfully
            return response.data;
        } else {
            // Handle the case where the server returns an error
            return response.data;
        }
    } catch (error) {
        // Handle any network or other errors that might occur during the request
        console.error('Error creating user:', error);
        return {
            success: false,
            message: 'Error creating user. Please try again later.',
        };
    }
}

export default userRegistration;