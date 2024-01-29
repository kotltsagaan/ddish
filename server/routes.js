// server/routes.js
const express = require('express');
const router = express.Router();
const Item = require('./models');

// Create
router.post('/items/', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

// Read
router.get('/items/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Update
router.put('/items/:id', async (req, res) => {
  const { id } = req.params.id;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedItem);
});

// Delete
router.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.json({ message: 'Item deleted successfully' });
});

module.exports = router;