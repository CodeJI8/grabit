import api from "./axios"


const getAllProducts = async()=>{ 

    const response  = await api.get("/allProducts");
    return response.data;




}



const createProduct = async(productData)=>{ 

    const response  = await api.post("/products", productData);
    return response.data;




}

export default {
    getAllProducts,
    createProduct
};