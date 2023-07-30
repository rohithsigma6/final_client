import React, { useState } from "react";

const EditProductPage = () => {
  const initialProductState = {
    productName: "Product X",
    brand: "Brand XYZ",
    model: "Model ABC",
    color: "Blue",
    storage: "256GB",
    ram: "8GB",
    displaySize: "6.5 inches",
    resolution: "1920x1080",
    batteryCapacity: "4000mAh",
    mainCamera: "20MP",
    frontCamera: "8MP",
    processorName: "Snapdragon 888",
    cores: 8,
    clockSpeed: "2.84GHz",
    operatingSystem: "Android",
    bluetooth: true,
    wifi: true,
    "4g": true,
    "5g": false,
    usbType: "Type-C",
    price: 999.99,
    availability: true,
    ratings: 4.5,
  };

  const [formData, setFormData] = useState(initialProductState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Updated Product Data:", formData);
  
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </label>
        <br />
       
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Storage:
          <input
            type="text"
            name="storage"
            value={formData.storage}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RAM:
          <input
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Display Size:
          <input
            type="text"
            name="displaySize"
            value={formData.displaySize}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Resolution:
          <input
            type="text"
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Battery Capacity:
          <input
            type="text"
            name="batteryCapacity"
            value={formData.batteryCapacity}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Main Camera:
          <input
            type="text"
            name="mainCamera"
            value={formData.mainCamera}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Front Camera:
          <input
            type="text"
            name="frontCamera"
            value={formData.frontCamera}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Processor Name:
          <input
            type="text"
            name="processorName"
            value={formData.processorName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Processor Cores:
          <input
            type="number"
            name="cores"
            value={formData.cores}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Processor Clock Speed:
          <input
            type="text"
            name="clockSpeed"
            value={formData.clockSpeed}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Operating System:
          <input
            type="text"
            name="operatingSystem"
            value={formData.operatingSystem}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bluetooth:
          <input
            type="checkbox"
            name="bluetooth"
            checked={formData.bluetooth}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Wi-Fi:
          <input
            type="checkbox"
            name="wifi"
            checked={formData.wifi}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          4G:
          <input
            type="checkbox"
            name="4g"
            checked={formData["4g"]}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          5G:
          <input
            type="checkbox"
            name="5g"
            checked={formData["5g"]}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          USB Type:
          <input
            type="text"
            name="usbType"
            value={formData.usbType}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Availability:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ratings:
          <input
            type="number"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
