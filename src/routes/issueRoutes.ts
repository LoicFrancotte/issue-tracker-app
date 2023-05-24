import express, { Router } from 'express';
import {  createIssue, 
          getAllIssues, 
          getIssueById, 
          updateIssue, 
          deleteIssue, 
        } from '../controllers/issueControllers';

const router: Router = express.Router();

router.post('/create/issue', createIssue);

router.get('/all/issue', getAllIssues);

router.get('/issue/:id', getIssueById);

router.put('/update/issue/:id', updateIssue);

router.delete('/delete/issue/:id', deleteIssue);

export default router;