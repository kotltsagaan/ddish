import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemDetails from './components/itemDetail';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleFormSubmit = (formData) => {
    if (selectedItemIndex !== null) {
      const updatedItems = [...items];
      updatedItems[selectedItemIndex] = formData;
      setItems(updatedItems);
      setSelectedItemIndex(null);
    } else {
      setItems([...items, formData]);
    }
    setShowModal(false);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItemIndex(null);
  };
  
  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleUpdate = (index) => {
    setShowModal(true);
    setSelectedItemIndex(index);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/items').then((response) => {
      setItems(response.data);
    });
    console.log(showModal);
  }, [showModal])

  return (
    <Router>
    <div>
      <button onClick={handleAddButtonClick}>Add Item</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <ItemForm />
          </div>
        </div>
      )}

      
        <Routes>
           <Route path="/" element={<ItemList />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
        </Routes>
    </div>
    </Router>
  );
};

export default App;