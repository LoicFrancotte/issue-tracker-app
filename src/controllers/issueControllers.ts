import { Request, Response } from 'express';
import Issue from '../models/issueModels';

// Create a new issue
export const createIssue = async (req: Request, res: Response) => {
  try {
    const {
      title,
      createdBy,
      status = 'inProgress',
      dueDate,
      assignee,
      labels,
    } = req.body;

    // Créer un nouvel objet Issue
    const issue = new Issue({
      title,
      createdBy,
      status,
      dueDate,
      assignee,
      labels,
      createdDate: new Date(),
    });

    // Enregistrer l'objet Issue dans la base de données
    await issue.save();

    // Retourner l'objet Issue créé avec un statut 201 (Created)
    res.status(201).json({ message: 'Issue created successfully', issue });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get all issues
export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const issues = await Issue.find();

    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get issue by id
export const getIssueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const issues = await Issue.findById(id);

    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Update issue by id
export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, createdBy, status, dueDate, assignee, labels } = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(id, {
      title,
      createdBy,
      status,
      dueDate,
      assignee,
      labels,
    });

    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    await updatedIssue.save();

    res.status(200).json({ message: 'Issue updated successfully', updatedIssue });
  }
  catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Delete issue by id
export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Issue.findByIdAndDelete(id);

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
