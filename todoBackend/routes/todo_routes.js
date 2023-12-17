import express from 'express';
import todoController from './../controllers/todo_controller.js';



const router = express.Router();


router.post('/', todoController.addTodo);

router.get('/', todoController.getTodos);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);


export default router;
