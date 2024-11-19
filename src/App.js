import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { getUsers, deleteUser, addUser } from './services/api';

import './App.css';

// Main App component
const App = () => {
  // State hooks for managing users, loading state, errors, and form states
  const [users, setUsers] = useState([]);          // Stores the list of users
  const [editingUser, setEditingUser] = useState(null); // Stores the currently edited user
  const [loading, setLoading] = useState(true);    // Flag to show loading spinner
  const [error, setError] = useState('');          // Stores error messages
  const [isAdding, setIsAdding] = useState(false); // Flag to toggle adding new user form

  // Fetch the users when the component is first mounted
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch the list of users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await getUsers(); // Call the API to get users
      console.log(response);
      setUsers(response.data); // Store the fetched users in state
    } catch (err) {
      setError('Failed to fetch users. Please try again.'); // Set error if fetch fails
    } finally {
      setLoading(false); // Stop loading once data is fetched or error occurred
    }
  };

  // Handle saving a user (either editing or adding)
  const handleSave = async (user) => {
    if (editingUser) {
      // Edit an existing user
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, ...user } : u)) // Update the user details
      );
    } else {
      try {
        // Add a new user
        const response = await addUser(user); // Call the API to add the user
        setUsers((prevUsers) => [
          ...prevUsers, // Add the new user to the existing list
          { ...user, id: response.data.id || Date.now() }, // Assign the id from the API or fallback to Date.now()
        ]);
      } catch (err) {
        setError('Failed to add user. Please try again.'); // Set error if adding fails
      }
    }
    setEditingUser(null); // Reset editing state after saving
    setIsAdding(false);   // Reset adding state after saving
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Call the API to delete the user
      // Update the users state to remove the deleted user
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== id); // Remove the deleted user
        return updatedUsers.map((user, index) => ({ // Re-assign IDs based on the new order
          ...user,
          id: index + 1, // Reset user IDs to maintain order
        }));
      });
    } catch (err) {
      setError('Failed to delete user. Please try again.'); // Set error if delete fails
    }
  };

  return (
    <div className='main-app'>
      {/* Render the title of the app */}
      <h1 className='heading'>User Management Dashboard</h1>
      
      {/* Display any error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Render the UserForm if adding or editing a user, else show the list of users */}
      {editingUser || isAdding ? (
        <UserForm
          user={editingUser} // Pass the current user data for editing
          onCancel={() => {
            setEditingUser(null); // Reset editing state if user cancels
            setIsAdding(false);   // Reset adding state if user cancels
          }}
          onSave={handleSave} // Pass the save function to handle form submission
        />
      ) : (
        <>
          {/* Render the UserList with user data */}
          <UserList
            users={users} // List of users to display
            loading={loading} // Show loading spinner while data is being fetched
            error={error} // Show any error message
            onEdit={setEditingUser} // Set the user to edit when "Edit" is clicked
            onDelete={handleDelete} // Delete the user when "Delete" is clicked
          />
          
          {/* Button to trigger adding a new user */}
          <div className='addBtn'>
            <button onClick={() => setIsAdding(true)}>Add User</button>
          </div>
        </>
      )}
    </div>
  );
};

// Export the App component to be used in index.js
export default App;
