import './userlist.css'

// UserList component for displaying the list of users
const UserList = ({ users, loading, error, onEdit, onDelete }) => {
  
  // Function to handle deletion of a user
  const handleDelete = (id) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(id); // Call the onDelete function passed as a prop
    }
  };

  // Render a loading message if the data is being fetched
  if (loading) return <p>Loading...</p>;

  // Render the error message if there's an issue fetching the data
  if (error) return <p>{error}</p>;

  return (
    <div className="userlist-container">
      {/* Title of the user list */}
      <h2>User List</h2>

      {/* Table to display users' details */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through each user in the list and display their details */}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* Split the name into first and last name */}
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1] || ''}</td> {/* If no last name, leave it empty */}
              <td>{user.email}</td>
              <td>{user.department || 'N/A'}</td> {/* If department is not available, show 'N/A' */}
              <td>
                {/* Edit button to open the edit form */}
                <button onClick={() => onEdit(user)}>Edit</button>
                {/* Delete button to trigger the delete action */}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
