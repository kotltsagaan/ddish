// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './ItemForm';
import { Link } from 'react-router-dom';
import ItemDetails from './itemDetail';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id, index) => {
    console.log(id)
    try {
      const response = await axios.delete(`http://localhost:5000/api/items/${id}`);
      if (response.status === 200) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      } else {
        console.error('Failed to delete item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/items').then((response) => {
      setItems(response.data);
    });
  }, []);

  return (
    <div className='mx-auto w-1/2'>
      <h2 className='text-red-500 flex items-center justify-center'>Хэрэглэгчдийн мэдээлэл</h2>
      <table className='table-auto w-full'>
        <thead>
         <tr >
            <th className='w-10 text-start' >№</th>
            <th className='text-start'> Нэр </th>
            <th className='text-start'> РД </th>
          </tr>
       </thead>
       <tbody>
          {items.map((item, index) => (
            <tr key={item._id} id={item._id} className={`${
              index % 2 === 0 ? 'bg-slate-100 ' : 'text-black'
            }`}>
              <td className='w-'>{index+1}</td>
              <td>{item.name}</td> 
              <td>{item.description}</td>
              <td>
                <button className='border border-rose-300 hover:border-indigo-300 rounded bg-slate-200 w-fit p-1' onClick={() => handleDelete(item._id, index)}>Delete</button>
              </td>
              <td>
                <Link to={`/item-details/${item._id}`}>
                  <button className='border border-blue-300 hover:border-indigo-300 rounded bg-slate-200 w-fit p-1'>Detail</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;