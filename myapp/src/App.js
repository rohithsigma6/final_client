import logo from './logo.svg';
import './App.css';
import MobileProductForm from './components/AddMobile/MobileProductForm';
import EditProductPage from './components/EditProduct/EditProductPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import Navbar from './components/NavBar/Navbar';
import ManageUsers from './components/ManageUsers/ManageUsers';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<LoginPage/>} />
  <Route path="/productlist" element={<Navbar><ProductList/></Navbar>} />
  <Route path="/addproduct" element={<Navbar><MobileProductForm/></Navbar>} />
  <Route path="/manageusers" element={<Navbar><ManageUsers/></Navbar>} />
</Routes>

</BrowserRouter>
  );
}

export default App;
