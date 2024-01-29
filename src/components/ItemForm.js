// src/components/ItemForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/items', { name, description }).then(() => {
      alert('Item created successfully');
      setName('');
      setDescription('');
    });
  };

  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ItemForm;
