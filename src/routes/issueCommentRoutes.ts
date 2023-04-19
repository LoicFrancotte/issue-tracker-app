import express, { Router } from 'express';
import {  addComment,
          getAllcomments, 
          getCommentById, 
          updateComment, 
          deleteComment
        } from '../controllers/issueCommentControllers';

const router: Router = express.Router();

router.post('/create/comments/:id', addComment);

router.get('/all/comments', getAllcomments);

router.get('/comments/:id', getCommentById);

router.put('/update/comments/:id', updateComment);

router.delete('/delete/comments/:id', deleteComment);

export default router;