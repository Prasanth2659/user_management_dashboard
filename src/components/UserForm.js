import React, { useState } from 'react';

const UserForm = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    department: user?.department || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      id: user?.id || Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      department: formData.department,
    };
    onSave(updatedUser);
  };

  return (
    <div >
      <h2 className='Heading'>{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          placeholder="Department"
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
