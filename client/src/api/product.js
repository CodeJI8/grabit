import api from "./axios"


const getAllProducts = async()=>{ 

    const response  = await api.get("/allProducts");
    return response.data;




}



const createProduct = async (productData) => {
    const formData = new FormData();

    formData.append("owner_id", productData.owner_id);
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image", productData.image);

    const response = await api.post("/products", formData);

    return response.data;
};

export default {
    getAllProducts,
    createProduct
};