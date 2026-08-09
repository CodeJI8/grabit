import { useEffect, useState } from "react";
import productApi from "../api/product";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


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
        <div>
            <h1>Welcome, {user?.name}</h1>

            <button onClick={() => navigate("/create-product")}>
    + List Product
         </button>

            <h2>Available Products</h2>

            {products.map((product) => (
                <div key={product.id}>
                      {product.image ? (
                            <img
                                src={product.image}
                                alt={product.title || "Product"}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    <h3>{product.title}</h3>
                     <p>Phone: {user?.phone || "N/A"}</p>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                </div>
            ))}
        </div>
    );



}

export default Home;