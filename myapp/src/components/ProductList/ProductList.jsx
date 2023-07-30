// http://localhost:8289/v1/getallproducts 
//http://localhost:8289/v1/deleteproduct/${id}
//http://localhost:8289/v1/updateproduct/${selectedProduct._id}
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
  
    axios
      .get("http://localhost:8289/v1/getallproducts",{
        headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
        }
    })
      .then((response) => {
        console.log(response)
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
 
    filterProducts();
  }, [products, searchTerm, brandFilter]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBrandFilterChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const filterProducts = () => {
   
    let filtered = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (brandFilter !== "All") {
      filtered = filtered.filter((product) => product.brand === brandFilter);
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = (id) => {
 
    axios
      .delete(`http://localhost:8289/v1/deleteproduct/${id}`,{
        headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
        }
    })
      .then((response) => {
        console.log("Product deleted:", response.data);
      
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedProduct(null);
  };

  const handleEditSave = () => {

    axios
      .put(`http://localhost:8289/v1/updateproduct/${selectedProduct._id}`, selectedProduct,{
        headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
        }
    })
      .then((response) => {
        console.log("Product updated:", response.data);
    
        const updatedProducts = products.map((product) =>
          product._id === selectedProduct._id ? selectedProduct : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        setOpenEdit(false);
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="product-list-container">
      <h1 className="dashboard-heading">Product List</h1>
      <div className="dashboard-controls">
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <TextField
          label="Filter by Brand"
          select
          value={brandFilter}
          onChange={handleBrandFilterChange}
          variant="outlined"
          className="brand-filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Samsung">Samsung</MenuItem>
          <MenuItem value="Apple">Apple</MenuItem>
       
        </TextField>
      </div>
      <TableContainer component={Paper} className="product-table-container">
        <Table className="product-table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Storage (GB)</TableCell>
              <TableCell>RAM (GB)</TableCell>
              <TableCell>Display Size</TableCell>
              <TableCell>Resolution</TableCell>
              <TableCell>Battery Capacity (mAh)</TableCell>
              <TableCell>Main Camera (MP)</TableCell>
              <TableCell>Front Camera (MP)</TableCell>
              <TableCell>Processor</TableCell>
              <TableCell>Operating System</TableCell>
              <TableCell>Bluetooth</TableCell>
              <TableCell>Wi-Fi</TableCell>
              <TableCell>4G</TableCell>
              <TableCell>5G</TableCell>
              <TableCell>USB Type</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product, index) =>(          
              <TableRow key={index}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.storage}</TableCell>
                <TableCell>{product.ram}</TableCell>
                <TableCell>{product.displaySize}</TableCell>
                <TableCell>{product.resolution}</TableCell>
                <TableCell>{product.batteryCapacity}</TableCell>
                <TableCell>{product.camera.mainCamera}</TableCell>
                <TableCell>{product.camera.frontCamera}</TableCell>
                <TableCell>{`${product.processor.name}, Cores: ${product.processor.cores}, Clock Speed: ${product.processor.clockSpeed}`}</TableCell>
                <TableCell>{product.operatingSystem}</TableCell>
                <TableCell>{product.connectivity.bluetooth ? <Check className="success-icon" /> : <Close className="error-icon" />}</TableCell>
                <TableCell>{product.connectivity.wifi ? <Check className="success-icon" /> : <Close className="error-icon" />}</TableCell>
                <TableCell>{product.connectivity['4g'] ? <Check className="success-icon" /> : <Close className="error-icon" />}</TableCell>
                <TableCell>{product.connectivity['5g'] ? <Check className="success-icon" /> : <Close className="error-icon" />}</TableCell>
                <TableCell>{product.connectivity.usbType}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.availability ? <Check className="success-icon" /> : <Close className="error-icon" />}</TableCell>
                <TableCell>{product.ratings}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p className="total-products">Total Products: {filteredProducts.length}</p>

   
      <Dialog open={openEdit} onClose={handleEditClose} fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        {selectedProduct && (
          <DialogContent>
            <TextField
              label="Product Name"
              value={selectedProduct.productName}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  productName: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Brand"
              value={selectedProduct.brand}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  brand: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Model"
              value={selectedProduct.model}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  model: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Color"
              value={selectedProduct.color}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  color: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Storage (GB)"
              value={selectedProduct.storage}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  storage: e.target.value,
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="RAM (GB)"
              value={selectedProduct.ram}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  ram: e.target.value,
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Display Size"
              value={selectedProduct.displaySize}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  displaySize: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Resolution"
              value={selectedProduct.resolution}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  resolution: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Battery Capacity (mAh)"
              value={selectedProduct.batteryCapacity}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  batteryCapacity: e.target.value,
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Main Camera (MP)"
              value={selectedProduct.camera.mainCamera}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  camera: { ...selectedProduct.camera, mainCamera: e.target.value },
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Front Camera (MP)"
              value={selectedProduct.camera.frontCamera}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  camera: { ...selectedProduct.camera, frontCamera: e.target.value },
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Processor Name"
              value={selectedProduct.processor.name}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  processor: { ...selectedProduct.processor, name: e.target.value },
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Processor Cores"
              value={selectedProduct.processor.cores}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  processor: { ...selectedProduct.processor, cores: e.target.value },
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Processor Clock Speed"
              value={selectedProduct.processor.clockSpeed}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  processor: { ...selectedProduct.processor, clockSpeed: e.target.value },
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Operating System"
              value={selectedProduct.operatingSystem}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  operatingSystem: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Bluetooth"
              select
              value={selectedProduct.connectivity.bluetooth}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  connectivity: {
                    ...selectedProduct.connectivity,
                    bluetooth: e.target.value,
                  },
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <TextField
              label="Wi-Fi"
              select
              value={selectedProduct.connectivity.wifi}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  connectivity: {
                    ...selectedProduct.connectivity,
                    wifi: e.target.value,
                  },
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <TextField
              label="4G"
              select
              value={selectedProduct.connectivity['4g']}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  connectivity: {
                    ...selectedProduct.connectivity,
                    '4g': e.target.value,
                  },
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <TextField
              label="5G"
              select
              value={selectedProduct.connectivity['5g']}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  connectivity: {
                    ...selectedProduct.connectivity,
                    '5g': e.target.value,
                  },
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <TextField
              label="USB Type"
              value={selectedProduct.connectivity.usbType}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  connectivity: { ...selectedProduct.connectivity, usbType: e.target.value },
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price ($)"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Availability"
              select
              value={selectedProduct.availability}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  availability: e.target.value,
                })
              }
              variant="outlined"
              fullWidth
              margin="normal"
            >
              <MenuItem value={true}>Available</MenuItem>
              <MenuItem value={false}>Out of Stock</MenuItem>
            </TextField>
            <TextField
              label="Ratings"
              value={selectedProduct.ratings}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  ratings: e.target.value,
                })
              }
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
