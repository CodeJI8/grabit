import { useEffect, useState } from "react";
import productApi from "../api/product";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";


function Home() {

    const {user} = useUser();
   const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const fetchProducts = async()=>{


        try {
            const response  = await productApi.getAllProducts();

            if (response.success) {
                setProducts(response.data);
                
            }



            
        } catch (error) {
            console.log(error)
            
        }


    }

    useEffect(() => {
    fetchProducts();
}, []);


return (
    <div className="home-page">

        <div className="home-header">
            <div>
                <h1>Welcome, {user?.name}</h1>
                <p>Explore available products</p>
            </div>

            <button
                className="list-product-btn"
                onClick={() => navigate("/create-product")}
            >
                + List Product
            </button>
        </div>

        <h2>Available Products</h2>

        <div className="product-grid">
            {products.map((p) => (
                <div className="product-card" key={p.id}>

                    {p.image ? (
                        <img
                            src={`http://localhost/grabit/api/${p.image}`}
                            alt={p.title}
                            className="product-image"
                        />
                    ) : (
                        <div className="no-image">
                            No image
                        </div>
                    )}

                    <div className="product-content">
                        <h3>{p.title}</h3>

                        <p className="product-description">
                            {p.description}
                        </p>

                        <p className="product-owner">
                            Owner: {user?.phone || "N/A"}
                        </p>

                        <div className="product-footer">
                            <span>৳ {p.price}</span>
                            <button>View</button>
                        </div>
                    </div>

                </div>
            ))}
        </div>

    </div>
);



}

export default Home;