// http://localhost:8289/v1/getallusers
//http://localhost:8289/v1/updateuser/${editUser._id}
//http://localhost:8289/v1/createuser
//http://localhost:8289/v1/deleteuser/${id}
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
const axiosInstance =axios.create({
    headers:{
        "authorization":`Bearer ${localStorage.getItem('token')}`
    }
})  

const ManageUsers = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [editUser, setEditUser] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8289/v1/getallusers',{
        headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
        }
    });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8289/v1/getallusers');
      const allUsers = response.data;
      const searchTerm = searchEmail.trim().toLowerCase();

      if (searchTerm === '') {
        setUsers(allUsers);
      } else {
        const filtered = allUsers.filter(
          (user) =>
            user.email.toLowerCase().includes(searchTerm)
        );
        setUsers(filtered);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
    setIsNewUser(true);
    setEditUser({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
    setEditUser({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  const handleEditDialogOpen = (user) => {
    setIsCreateDialogOpen(true);
    setIsNewUser(false);
    setEditUser(user);
  };

  const handleCreateUser = async () => {
    try {
      if (isNewUser) {
        console.log(editUser)
        const response = await axiosInstance.post('     ',editUser);
        console.log(response)
        
      } else {
        console.log(editUser)
        await axiosInstance.put(`http://localhost:8289/v1/updateuser/${editUser._id}`,editUser);
      }

      fetchUsers();
      handleCreateDialogClose();    
    } catch (error) {
      console.error('Error creating/editing user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`http://localhost:8289/v1/deleteuser/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEditInputChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 style={{ margin: '20px 0' }}>MANAGE USERS</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search by Email"
            variant="outlined"
            value={searchEmail}
            onChange={handleSearchChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            onClick={handleCreateDialogOpen}
            fullWidth
            color="primary"
          >
            Create User
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditDialogOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isCreateDialogOpen} onClose={handleCreateDialogClose}>
        <DialogTitle>{isNewUser ? 'Create User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                variant="outlined"
                name="firstName"
                value={editUser.firstName}
                onChange={handleEditInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={editUser.lastName}
                onChange={handleEditInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={editUser.email}
                onChange={handleEditInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={editUser.password}
                onChange={handleEditInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            {isNewUser ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageUsers;
