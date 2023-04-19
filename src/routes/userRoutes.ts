import express, { Router } from 'express';
import {  register, 
          login ,
          getUserByUserName,
          getAllUsers,
          getUserById,
          updateUserById,
          deleteUserById
        } from '../controllers/userControllers';

const router: Router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/username/:username', getUserByUserName);

router.get('/all/user', getAllUsers);

router.get('/user/:id', getUserById);

router.put('/update/:id', updateUserById)

router.delete('/delete/:id', deleteUserById); 

export default router;