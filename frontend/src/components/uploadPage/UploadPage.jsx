import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../uploadPage/UploadPage.css";

const UploadPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("INR");
    const [images, setImages] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleImageChange = (event) => {
        const files = event.target.files[0];
        const formData = new FormData();
        formData.append("image", files)

        if (images.length < 6) {
            axios.post("https://quleep.onrender.com/api/v1/upload-images", formData)
                .then(async (response) => {
                    const imageUrls = response.data;
                    setImages([...images, imageUrls]);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            window.alert("you can not upload more than 6 images")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // make API call to create new product
        axios.post("https://quleep.onrender.com/api/v1/products", { name, description, price, currency, images })
            .then((response) => {
                console.log(response)
                navigate("/")
            })
            .catch((error) => {
                console.error(error);
            });

        // clear form fields and images
        setName("");
        setDescription("");
        setPrice("");
        setCurrency("USD");
        setImages([]);
    };

    return (
        <div style={{color:"blue",fontSize:"1.5rem",marginTop:"0%"}}>
            <p style={{color:"red",textAlign:"center", backgroundColor:"black"}}>Add New Product Details for Listing</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name :</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description :</label><br />
                    <textarea id="description" name="description" value={description} onChange={handleDescriptionChange} required />
                </div>
                <div>
                    <label htmlFor="price">Price :</label>
                    <input type="number" id="price" name="price" value={price} onChange={handlePriceChange} required />
                </div>
                <div>
                    <label htmlFor="currency">Currency :</label>
                    <select id="currency" name="currency" value={currency} onChange={handleCurrencyChange} required>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="images">Images :</label>
                    <input type="file" id="images" name="images" accept="image/*" onChange={handleImageChange} multiple required />
                    {images?.map((imageUrl) => (
                        <img key={imageUrl} src={imageUrl} alt="Product" style={{ maxWidth: "100px", maxHeight: "100px", margin: "10px", border: "2px solis red" }} />
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UploadPage;
