import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../api/product";
import { useUser } from "../context/UserContext";

function CreateProduct() {

    const navigate = useNavigate();
    const { user } = useUser();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
        owner_id: user.id,
        ...formData
    };

    console.log("Sending:", productData);

    try {
        const response = await productApi.createProduct(productData);

        console.log("Server response:", response);

        if (response.success) {
            alert(response.message);
            navigate("/home");
        }

    } catch (error) {
        console.log("API Error:", error);
        console.log("Backend Response:", error.response?.data);
    }
};

    return (
        <div>
            <h1>List Your Product</h1>

            <form onSubmit={handleSubmit}>
                

                <input
                    type="text"
                    name="title"
                    placeholder="Product title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Product description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />

                <button type="submit">
                    List Product
                </button>

            </form>
        </div>
    );
}

export default CreateProduct;