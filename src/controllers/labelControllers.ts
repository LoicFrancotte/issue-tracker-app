import { Request, Response } from 'express';
import Label from '../models/labelModels';

// Create a new label
export const createLabel = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;

    const newLabel = new Label({ name, color });
    await newLabel.save();
    
    res.status(201).json({ message: 'Label created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while creating the label.' });
  }
};

// Get all labels
export const getAllLabels = async (req: Request, res: Response) => {
  try {
    const labels = await Label.find();
    res.status(200).json(labels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching labels.' });
  }
};

// Update label by ID
export const updateLabel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    
    const label = await Label.findById(id);
    if (!label) {
      return res.status(404).json({ message: 'Label not found' });
    }
    
    label.name = name;
    label.color = color;
    await label.save();

    res.status(200).json({ message: 'Label updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the label.' });
  }
};

// Delete label by ID
export const deleteLabelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedLabel = await Label.findByIdAndDelete(id);
    if (!deletedLabel) {
      return res.status(404).json({ message: 'Label not found' });
    }

    res.status(200).json({ message: 'Label deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the label.' });
  }
}