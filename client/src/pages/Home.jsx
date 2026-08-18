import { useEffect, useState } from "react";
import productApi from "../api/product";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import "../styles/Home.css";


function Home() {

    const {user, setUser} = useUser();
   const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.log("Logout failed or endpoint not found:", error);
        }
        if (setUser) setUser(null);
        navigate("/login");
    };

    const closeDialog = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="home-page">
            <div className="home-header">
                <div>
                    <h1>Welcome, {user?.name}</h1>
                    <p>Explore available products</p>
                </div>

                <div className="home-actions" style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="list-product-btn"
                        onClick={() => navigate("/create-product")}
                    >
                        + List Product
                    </button>
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                        style={{ backgroundColor: "#ff4d4f", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <h2>Available Products</h2>

            <div className="product-grid">
                {products.map((p) => {
                    const isAvailable = p.status !== 'borrowed';
                    return (
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
                                Owner: <strong>{p.owner_name || "N/A"}</strong>
                            </p>
                            
                            <p className="product-status" style={{ color: isAvailable ? 'green' : 'red', fontWeight: 'bold', margin: '5px 0' }}>
                                {isAvailable ? "Available" : "Already someone's borrowing"}
                            </p>

                            <div className="product-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                <span className="product-price">
                                    ৳ {p.price}
                                </span>
                                <button 
                                    className="borrow-btn" 
                                    disabled={!isAvailable}
                                    onClick={() => setSelectedProduct(p)}
                                    style={{
                                        backgroundColor: isAvailable ? '#4CAF50' : '#ccc',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Borrow
                                </button>
                            </div>
                        </div>
                    </div>
                )})}
            </div>

            {selectedProduct && (
                <div className="dialog-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="dialog-content" style={{
                        backgroundColor: 'white', padding: '20px', borderRadius: '8px', 
                        maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Connect with Lender</h3>
                        <p><strong>Name:</strong> {selectedProduct.owner_name || "N/A"}</p>
                        <p><strong>Number:</strong> {selectedProduct.owner_phone || "N/A"}</p>
                        <p style={{ color: '#555', marginTop: '15px' }}>
                            You can now call and connect with the Lender.
                        </p>
                        <button onClick={closeDialog} style={{
                            marginTop: '15px', backgroundColor: '#007BFF', color: 'white', 
                            border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer'
                        }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;