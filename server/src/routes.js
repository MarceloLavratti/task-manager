import { Router } from "express";
import UserController from './controllers/userController.js'

const router = Router()

router.get('/users', UserController.getAllUsers)
router.get('/users/:id', UserController.getUserById)
router.post('/users', UserController.createUser)
router.put('/users/:id', UserController.updateUser)
router.patch('/users/:id', UserController.updateUserPartial);
router.delete('/users/:id', UserController.deleteUser)

export default router