"use server"

import AxiosSecure from "@/lib/axios/axiosSecure/config"

// for addding product to database
export const addNewProduct = async formData => {
    const [axiosSecure] = AxiosSecure();
    // console.log(axiosSecure, formData);
    try {
        const response = await axiosSecure.post('/admin/addAProduct', formData)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

// for retrieving stored products from the database
export const getAllProducts = async () => {

}

// for updating existing product from database
export const updateProduct = async formData => {

}

// for deleting existing product from database
export const deleteProduct = async formData => {

}

// for getting products by its category from the server
export const productByCategory = async category => {

}

// for getting product by it's id
export const productById = async id => {

}