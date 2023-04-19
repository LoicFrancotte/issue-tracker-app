import express, { Router } from 'express';

import {  getAllLabels, 
          createLabel,
          updateLabel,
          deleteLabelById
        } from '../controllers/labelControllers';

const router: Router = express.Router();

router.post('/create/labels', createLabel);

router.get('/all/labels', getAllLabels);

router.put('/update/labels/:id', updateLabel);

router.delete('/delete/labels/:id', deleteLabelById)

export default router;