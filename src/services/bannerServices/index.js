import axiosSecureConfig from "@/lib/axios/axiosSecure/config";

// for getting banner information
export async function getAllBannerData () {
    try {
        const res = await fetch('http://localhost:3000/api/getBannerInfo', {
            method: 'GET',
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`)
        }

        const bannerData = await res.json();

        return bannerData;
        
    } catch (err) {
        console.log(err.message);
    }
}

// for adding data to banner collection
export default async function addBannerData (bannerInfoObj) {
    const axiosSecure = axiosSecureConfig();

    try {
        const res = await axiosSecure.post('/admin/addBannerData', bannerInfoObj);
        return res.data;
    } catch (err) {
        console.log(err.message);
    }

}