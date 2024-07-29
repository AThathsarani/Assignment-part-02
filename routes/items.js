const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Create Item
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const item = new Item({ name, description, price });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).send('Error creating item');
  }
});

// Read Items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(400).send('Error fetching items');
  }
});

// Read Item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    res.status(400).send('Error fetching item');
  }
});

// Update Item
router.put('/:id', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    res.status(400).send('Error updating item');
  }
});

// Delete Item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.send('Item deleted');
  } catch (err) {
    res.status(400).send('Error deleting item');
  }
});

module.exports = router;
