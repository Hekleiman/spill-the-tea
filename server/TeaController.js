// TeaController.js
import Tea from './TeaModel.js';

export const createTea = async (req, res) => {
  try {
    const { name, origin, caffeineLevel, image, type, description, color } = req.body;
    
    const newTea = await Tea.create({
      name,
      origin,
      caffeineLevel,
      image,
      type,
      description,
      color,
    });
    
    console.log('newTea', newTea);
    res.status(201).json(newTea);
  } catch (err) {
    console.error('Error creating tea', err);
    res.status(400).json({ error: 'Failed to create tea' });
  }
};

export const getTeas = async (req, res) => {
  try {
    const teas = await Tea.find({});
    res.status(200).json(teas);
  } catch (err) {
    console.error('Error getting teas', err);
    res.status(500).json({ error: 'Error getting teas' });
  }
};

export const deleteTea = async (req, res) => {
  try {
    const deletedTea = await Tea.findByIdAndDelete(req.params.id);
    
    if (!deletedTea) {
      return res.status(404).json({ error: 'Tea not found' });
    }
    
    res.status(200).json({ message: 'Tea deleted successfully', tea: deletedTea });
  } catch (err) {
    console.error('Error deleting tea', err);
    res.status(500).json({ error: 'Error deleting tea' });
  }
};

export const updateTea = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    
    const updatedTea = await Tea.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );
    
    if (!updatedTea) {
      return res.status(404).json({ error: 'Tea not found' });
    }
    
    res.status(200).json(updatedTea);
  } catch (err) {
    console.error('Error updating tea', err);
    res.status(400).json({ error: 'Failed to update tea' });
  }
};