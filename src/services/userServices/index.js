import axiosSecureConfig from "@/lib/axios/axiosSecure/config";

export async function fetchUserRole (userData) {
    const [axiosSecure] = axiosSecureConfig();
    try {
        const response = await axiosSecure.get('/userRole', userData);

        if (response.data.success) {
            return { role: response.data.userRole };
        }

        if(!response.data.success) {
            console.log(response.data.message);
        }

        return { role: null };
    } catch(err) {
        console.log(err);
    }

    
}

export async function fetchUserData (userData) {
    const [axiosSecure] = axiosSecureConfig();

    try {
        const response = await axiosSecure.get('/loggedInUserInfo', userData);

        if (response.data.success) {
            return { userData: response.data.userData };
        }

        if (!response.data.success) {
            console.log(response.data.message);
        }

        return { userData: null };
        
    } catch (err) {
        console.log(err);
    }
}