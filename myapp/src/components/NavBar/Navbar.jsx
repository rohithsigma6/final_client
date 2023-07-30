import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, Category, ShoppingCart, Person, ExitToApp } from "@mui/icons-material";
import { Currentuser } from "../../utils/auth";

const Navbar = ({children}) => {

const [user, setUser] = useState("")
const navigate = useNavigate()
const validateToken = async () => {
    try {
        const response = await Currentuser()
        console.log(response)
        if (response.data.success) {
            console.log(response)
            setUser(response.data.details)
            navigate("/productlist")
        }
        else {
            alert(response.message)
            navigate("/")
        }
    }
    catch (err) {
        navigate("/")
        alert("error")
    }
}
useEffect(() => {
    if (localStorage.getItem("token")) {
        validateToken()
        navigate("/productlist")
    }
    else {
        alert("please login to continue")
        navigate("/")
    }
}, [])
  return (
    <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mobile Store ADMIN
        </Typography>
        <Stack direction="row" spacing={2}>
      
          <Avatar alt="User Avatar" src="/path-to-your-avatar.png" />

          <Button color="inherit" onClick={(e)=>{
            e.preventDefault()
            navigate("/productlist")
          }} startIcon={<Category />}>
            Manage Products
          </Button>
          <Button color="inherit"  onClick={(e)=>{
            e.preventDefault()
            navigate("/addproduct")
          }} startIcon={<AddCircleOutline />}>
            Add Product
          </Button>
          <Button color="inherit" startIcon={<ShoppingCart />}>
            Manage Orders
          </Button>
          <Button color="inherit" 
           onClick={(e)=>{
            e.preventDefault()
            navigate("/manageusers")
          }} startIcon={<Person />}>
            Manage Users
          </Button>
          <Button color="inherit" onClick={(e)=>{
            e.preventDefault()
            localStorage.removeItem("token")
            navigate("/")
          }} startIcon={<ExitToApp />} >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>   
    {user && (
              
              <div>{children}</div>
               
            )}
    </div>
  );
};

export default Navbar;
