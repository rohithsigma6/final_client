
import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { AddCircleOutline, Wifi, NetworkCell, Memory, CameraAlt, Settings, Storage, BatteryChargingFull, PhoneAndroid, Star } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete'; 
import './MobileProductForm.css';
const axiosInstance =axios.create({
  headers:{
      "authorization":`Bearer ${localStorage.getItem('token')}`
  }
})  

const MobileProductForm = () => {
  const initialProductState = {
    productName: '',
    brand: '',
    model: '',
    color: '',
    storage: '',
    ram: '',
    displaySize: '',
    resolution: '',
    batteryCapacity: '',
    mainCamera: '',
    frontCamera: '',
    processorName: '',
    processorCores: '',
    processorClockSpeed: '',
    operatingSystem: '', 
    bluetooth: false,
    wifi: false,
    '4g': false,
    '5g': false,
    usbType: '',
    price: '',
    availability: false,
    ratings:''
  };

  const [product, setProduct] = useState(initialProductState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hiiii')
    const formErrors = validateForm();  
    console.log(formErrors) 
    if (Object.keys(formErrors).length === 0) {
      console.log("hii")
      const data = {
        productName: product.productName,
        brand: product.brand,
        model: product.model,
        color: product.color,
        storage: product.storage,
        ram: product.ram,
        displaySize: product.displaySize,
        resolution: product.resolution,
        batteryCapacity: product.batteryCapacity,
        camera: {
          mainCamera: product.mainCamera,
          frontCamera: product.frontCamera
        },
        processor: {
          name: product.processorName,
          cores: product.processorCores,
          clockSpeed: product.processorClockSpeed
        },
        operatingSystem: product.operatingSystem,
        connectivity: {
          bluetooth: product.bluetooth,
          wifi: product.wifi,
          '4g': product['4g'],
          '5g': product['5g'],
          usbType: product.usbType
        },
        price: product.price,
        availability: product.availability,
        ratings: product.ratings
      };
      
      console.log(data)
      axiosInstance.post('http://localhost:8289/v1/postproduct', data)
        .then(response => {
          console.log('Data sent successfully!', response.data);
          setProduct(initialProductState);
        })
        .catch(error => {
          console.log(error)
          console.error('Error sending data:', error);
        });
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        if (product[key] === '' && key !== 'availability') {
          errors[key] = `Please fill in the '${key}' field.`;
        }
      }
    }
    const numericFields = ['storage', 'ram', 'mainCamera', 'frontCamera', 'processorCores', 'price', 'ratings'];
    numericFields.forEach(field => {
      if (product[field] !== '' && isNaN(Number(product[field]))) {
        errors[field] = `Please enter a valid number for '${field}'.`;
      } else if (product[field] !== '' && Number(product[field]) < 0) {
        errors[field] = `Please enter a non-negative value for '${field}'.`;
      }
    });
    return errors;
  };


  const operatingSystems = ['Android', 'iOS', 'Windows', 'BlackBerry', 'Other'];


  const famousBrands = [
    'Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Oppo', 'Vivo', 'Realme', 'Sony',
    'Nokia', 'LG', 'Motorola', 'Asus', 'Lenovo', 'Huawei', 'HTC', 'BlackBerry', 'Alcatel',
    'ZTE', 'Gionee'
  ];

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1 className="form-heading">Add a New Mobile Product</h1>
      <div className="form-field">
        <TextField label="Product Name" id="productName" name="productName" value={product.productName} onChange={handleChange} required fullWidth />
        {errors.productName && <span className="error-message">{errors.productName}</span>}
        <PhoneAndroid className="input-icon" />
      </div>
      <div className="form-field">
        <Autocomplete
          options={famousBrands}
          value={product.brand}
          onChange={(event, newValue) => {
            setProduct({ ...product, brand: newValue });
            setErrors({ ...errors, brand: '' });
          }}
          renderInput={(params) => <TextField {...params} label="Brand" id="brand" name="brand" required fullWidth />}
        />
        {errors.brand && <span className="error-message">{errors.brand}</span>}
        <PhoneAndroid className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Model" id="model" name="model" value={product.model} onChange={handleChange} required fullWidth />
        {errors.model && <span className="error-message">{errors.model}</span>}
        <PhoneAndroid className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Color" id="color" name="color" value={product.color} onChange={handleChange} required fullWidth />
        {errors.color && <span className="error-message">{errors.color}</span>}
        <PhoneAndroid className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Storage (GB)" type="number" id="storage" name="storage" value={product.storage} onChange={handleChange} required fullWidth />
        {errors.storage && <span className="error-message">{errors.storage}</span>}
        <Storage className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="RAM (GB)" type="number" id="ram" name="ram" value={product.ram} onChange={handleChange} required fullWidth />
        {errors.ram && <span className="error-message">{errors.ram}</span>}
        <Memory className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Display Size" id="displaySize" name="displaySize" value={product.displaySize} onChange={handleChange} required fullWidth />
        {errors.displaySize && <span className="error-message">{errors.displaySize}</span>}
        <PhoneAndroid className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Resolution" id="resolution" name="resolution" value={product.resolution} onChange={handleChange} required fullWidth />
        {errors.resolution && <span className="error-message">{errors.resolution}</span>}
        <Settings className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Battery Capacity (mAh)" type="number" id="batteryCapacity" name="batteryCapacity" value={product.batteryCapacity} onChange={handleChange} required fullWidth />
        {errors.batteryCapacity && <span className="error-message">{errors.batteryCapacity}</span>}
        <BatteryChargingFull className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Main Camera (MP)" type="number" id="mainCamera" name="mainCamera" value={product.mainCamera} onChange={handleChange} required fullWidth />
        {errors.mainCamera && <span className="error-message">{errors.mainCamera}</span>}
        <CameraAlt className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Front Camera (MP)" type="number" id="frontCamera" name="frontCamera" value={product.frontCamera} onChange={handleChange} required fullWidth />
        {errors.frontCamera && <span className="error-message">{errors.frontCamera}</span>}
        <CameraAlt className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Processor Name" id="processorName" name="processorName" value={product.processorName} onChange={handleChange} required fullWidth />
        {errors.processorName && <span className="error-message">{errors.processorName}</span>}
        <Settings className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Number of Cores" type="number" id="processorCores" name="processorCores" value={product.processorCores} onChange={handleChange} required fullWidth />
        {errors.processorCores && <span className="error-message">{errors.processorCores}</span>}
        <Settings className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Processor Clock Speed (GHz)" type="number" id="processorClockSpeed" name="processorClockSpeed" value={product.processorClockSpeed} onChange={handleChange} required fullWidth />
        {errors.processorClockSpeed && <span className="error-message">{errors.processorClockSpeed}</span>}
        <Settings className="input-icon" />
      </div>
      <div className="form-field">
        <Autocomplete
          options={operatingSystems}
          value={product.operatingSystem}
          onChange={(event, newValue) => {
            setProduct({ ...product, operatingSystem: newValue });
            setErrors({ ...errors, operatingSystem: '' });
          }}
          renderInput={(params) => <TextField {...params} label="Operating System" id="operatingSystem" name="operatingSystem" required fullWidth />}
        />
        {errors.operatingSystem && <span className="error-message">{errors.operatingSystem}</span>}
        <Settings className="input-icon" />
      </div>
      <div className="form-field">
        <Checkbox id="bluetooth" name="bluetooth" checked={product.bluetooth} onChange={handleChange} color="primary" />
        <label htmlFor="bluetooth"><Wifi className="checkbox-icon" />Bluetooth</label>
      </div>
      <div className="form-field">
        <Checkbox id="wifi" name="wifi" checked={product.wifi} onChange={handleChange} color="primary" />
        <label htmlFor="wifi"><NetworkCell className="checkbox-icon" />Wi-Fi</label>
      </div>
      <div className="form-field">
        <Checkbox id="4g" name="4g" checked={product['4g']} onChange={handleChange} color="primary" />
        <label htmlFor="4g"><NetworkCell className="checkbox-icon" />4G</label>
      </div>
      <div className="form-field">
        <Checkbox id="5g" name="5g" checked={product['5g']} onChange={handleChange} color="primary" />
        <label htmlFor="5g"><NetworkCell className="checkbox-icon" />5G</label>
      </div>
      <div className="form-field">
        <TextField label="USB Type" id="usbType" name="usbType" value={product.usbType} onChange={handleChange} required fullWidth />
        {errors.usbType && <span className="error-message">{errors.usbType}</span>}
        <Settings className="input-icon" />
      </div>
      <div className="form-field">
        <TextField label="Price ($)" type="number" id="price" name="price" value={product.price} onChange={handleChange} required fullWidth />
        {errors.price && <span className="error-message">{errors.price}</span>}
        <Star className="input-icon" />
      </div>
      <div className="form-field">
        <Checkbox id="availability" name="availability" checked={product.availability} onChange={handleChange} color="primary" />
        <label htmlFor="availability">Availability</label>
      </div>
      <div className="form-field">
        <TextField label="Ratings" type="number" id="ratings" name="ratings" value={product.ratings} onChange={handleChange} required fullWidth />
        {errors.ratings && <span className="error-message">{errors.ratings}</span>}
        <Star className="input-icon" />
      </div>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        <AddCircleOutline className="submit-icon" />
        Submit
      </Button>
    </form>
  );
};

export default MobileProductForm;
