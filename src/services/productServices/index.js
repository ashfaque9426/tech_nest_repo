"use server"
// import axiosSecureConfig from "@/lib/axios/axiosSecure/config";
import axios from "axios";

// for addding product to database
export const addNewProduct = async formData => {
    // const [axiosSecure] = axiosSecureConfig();
    // console.log(axiosSecure, formData);
    try {
        const response = await axios.post('http://localhost:3000/api/admin/addAProduct', formData);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

// for retrieving stored products from the database
export const getAllProducts = async () => {

}

// for getting products by its category from the server
export const productByCategory = async (category, limit = 0) => {
    try {
        const res = await fetch(`http://localhost:3000/api/productByCategory?category=${category}&limit=${limit}`, {
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
export const getProductsByBrandName = async (brandName, limit = 0, category="") => {
    try {
        const res = await fetch(`http://localhost:3000/api/productByBrand?brand=${brandName}&limit=${limit}&category=${category}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(`Error while fetching data. Error: ${error.message}`);
    }
}

// for retrieving stored products from the database
export const getProductsByModelName = async (modelName, limit = 0) => {
    try {
        const res = await fetch(`http://localhost:3000/api/productByModel?model=${modelName}&limit=${limit}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`);
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

// get products by search strings.
export const productsBySearchStrings = async (url, limit = 0) => {
    try {
        const response = await fetch(`${url}&limit=${limit}`, {
            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error(`Http error! Status code: ${res.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error while fetching data. Error: ${error.message}`);
    }
}

// for getting product by it's id
export const productById = async id => {
    try{
        const res = await fetch(`http://localhost:3000/api/singleProductDetails?id=${id}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if(!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`);
        }

        const data = await res.json();
        return data;
        
    } catch (err) {
        console.log(`Error while fetching data. Error: ${err.message}`);
    }
}

// get product suggestion service api
export const getProductSuggestions = async (searchStr) => {
    try {
        const response = await fetch(`http://localhost:3000/api/getSearchSuggestionsBySearchStr?searchStr=${searchStr}`, {
            method: 'GET',
            cache: 'no-store'
        });

        if(!response.ok) {
            throw new Error(`Http error! Status code: ${res.status}`);
        }

        const data = await response.json();
        return data;
        
    } catch (err) {
        console.log(`Error while fetching data. Error: ${err.message}`);
    }
}

// add a question for specific product api
export const addQuestionForProduct = async (id, questionObj, userEmail="") => {
    try {
        const res = await fetch(`http://localhost:3000/api/addQuestionForProduct?productId=${id}&userEmail=${userEmail}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionObj),
        })

        if(!res.ok) {
            throw new Error(`Http error! Status code: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.log(`Error while adding Question for Product. Error: ${err.message}`);
    }
}

// getting products by discounted value
export const getProductsByDiscountedValue = async (discountValue = 0, exact = false) => {
    try {
        if (discountValue > 0) {
            const res = await fetch(`http://localhost:3000/api/getProductsByDiscountedNumber?discountPercentageNumber=${discountValue}&exact=${exact}`, {
                method: 'GET',
                cache: 'no-store'
            });

            if(!res.ok) {
                throw new Error(`Http error! Status code: ${res.status}`);
            }

            const data = await res.json();
            return data;
        }
    } catch (err) {
        console.log(err.message);
    }
}