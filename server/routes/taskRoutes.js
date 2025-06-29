import express from 'express';
import verifyJWT from '../middlewares/verifyJWT.js';
import { getTasks, createTask, updateTask, deleteTask, shareTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', verifyJWT, getTasks);
router.post('/', verifyJWT, createTask);
router.put('/:id', verifyJWT, updateTask);
router.delete('/:id', verifyJWT, deleteTask);
router.post('/:id/share', verifyJWT, shareTask); 

export default router;
