// ItemDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/`);
        const foundItem = response.data.find(item => item._id === id);
  
        setItem(foundItem);
        setUpdatedName(foundItem.name);
        setUpdatedDescription(foundItem.description);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      console.log('Updating item with ID:', id);
      console.log('Updated data:', {
        name: updatedName,
        description: updatedDescription,
      });
  
      const response = await axios.put(`http://localhost:5000/api/items/`, {

        name: updatedName,
        description: updatedDescription,
      });
  
      console.log('Update response:', response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  return (
    <div>
      {item ? (
        <div className='mx-auto w-1/2'>
          <h2 className='text-2xl p-4'>Хэрэглэгчийн мэдээлэл</h2>
          <p>ID: {item._id}</p>
          {editMode ? (
            <div>
              <label>
                Name:
                <input className='text-bn'
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Description:
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
              </label>
              <br />
              <button className='border border-rose-300 hover:border-indigo-300 rounded bg-slate-200 w-10' onClick={handleUpdate}>Save</button>
            </div>
          ) : (
            <div>
              <p>Name: {item.name}</p>
              <p>Description: {item.description}</p>
              <button className='border border-rose-300 hover:border-indigo-300 rounded bg-slate-200 w-10' onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetails;