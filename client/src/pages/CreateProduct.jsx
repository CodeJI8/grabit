import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../api/product";
import { useUser } from "../context/UserContext";
import "../styles/CreateProduct.css";

function CreateProduct() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Please log in before listing a product.");
      navigate("/login");
      return;
    }

    const productData = {
      owner_id: user.id,
      ...formData,
    };

    console.log("Sending:", productData);

    try {
      const response = await productApi.createProduct(productData);

      console.log("Server response:", response?.data || response);

      if (response?.success) {
        alert(response.message || "Product listed successfully!");
        navigate("/home");
      } else {
        alert(response?.message || "Failed to list product.");
      }
    } catch (error) {
      console.log("API Error:", error);
      console.log("Backend Response:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong while listing the product.");
    }
  };

return (
  <div className="create-product-page">
    <div className="create-product-card">
      <h1>List Your Product</h1>
      <p className="subtitle">
        Share your equipment with other students
      </p>

      <form onSubmit={handleSubmit} className="product-form">

        <div className="form-group">
          <label>Product Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Arduino Kit"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your product..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>

          <div className="image-upload">
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
            />

            <span>
              {formData.image
                ? formData.image.name
                : "Choose a product image"}
            </span>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          List Product
        </button>

      </form>
    </div>
  </div>
);
}

export default CreateProduct;
