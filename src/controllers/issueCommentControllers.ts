import { Request, Response } from 'express';
import Issue from '../models/issueModels';

// Create a comment
export const addComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment, createdBy } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const newComment = {
      comment,
      createdBy,
      createdDate: new Date(),
    };

    issue.comments.push(newComment);
    issue.commentCount += 1;

    await issue.save();

    res.status(200).json({ message: 'Comment added successfully', newComment });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get all comments
export const getAllcomments = async (req: Request, res: Response) => {
  try {
    const issues = await Issue.find();
    const comments = issues.map((issue) => issue.comments);
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// Get a comment by id
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const issues = await Issue.find();
    let foundComment = null;

    for (const issue of issues) {
      for (const comment of issue.comments) {
        if (comment._id?.toString() === id) {
          foundComment = comment;
          break;
        }
      }
      if (foundComment) {
        break;
      }
    }

    if (!foundComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ comment: foundComment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment, createdBy } = req.body;

    const issues = await Issue.find();
    let foundIssue = null;
    let foundCommentIndex = -1;

    for (const issue of issues) {
      foundCommentIndex = issue.comments.findIndex((comment) => comment._id?.toString() === id);
      if (foundCommentIndex !== -1) {
        foundIssue = issue;
        break;
      }
    }

    if (!foundIssue) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const updatedComment = {
      _id: foundIssue.comments[foundCommentIndex]._id,
      comment,
      createdBy,
      createdDate: new Date(),
    };

    foundIssue.comments[foundCommentIndex] = updatedComment;

    await foundIssue.save();

    res.status(200).json({ message: 'Comment updated successfully', updatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const issues = await Issue.find();
    let foundIssue = null;
    let foundCommentIndex = -1;

    for (const issue of issues) {
      foundCommentIndex = issue.comments.findIndex((comment) => comment._id?.toString() === id);
      if (foundCommentIndex !== -1) {
        foundIssue = issue;
        break;
      }
    }

    if (!foundIssue) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    foundIssue.comments.splice(foundCommentIndex, 1);
    await foundIssue.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};