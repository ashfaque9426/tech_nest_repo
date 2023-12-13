"use server"

import axiosSecureConfig from "@/lib/axios/axiosSecure/config";

// for addding product to database
export const addNewProduct = async formData => {
    const [axiosSecure] = axiosSecureConfig();
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

// for getting products by its category from the server
export const productByCategory = async category => {
    try {
        const res = await fetch(`http://localhost:3000/api/productByCategory?category=${category}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`)
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(`Error while fetching data. Error: ${error.message}`);
    }
}

// for retrieving stored products from the database
export const getProductsByBrandName = async brandName => {
    try {
        const res = await fetch(`http://localhost:3000/api/productByBrand?brand=${brandName}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`)
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(`Error while fetching data. Error: ${error.message}`);
    }
}

// for retrieving stored products from the database
export const getProductsByModelName = async modelName => {
    try {
        const res = await fetch(`http://localhost:3000/api/productByModel?model=${modelName}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`)
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(`Error while fetching data. Error: ${error.message}`);
    }
}

// for updating existing product from database
export const updateProduct = async formData => {

}

// for deleting existing product from database
export const deleteProduct = async id => {

}

// for getting product by it's id
export const productById = async id => {

}