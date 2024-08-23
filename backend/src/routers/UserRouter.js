import express from 'express';
import { getAllUsers, userLogin, userRegister } from '../controllers/UserControllers.js';
import { isAuth } from '../middlewares/AuthMiddleware.js';


const userRouter = express.Router();

userRouter.get('/all', isAuth(['User', 'Admin']) ,getAllUsers)

userRouter.post('/register', userRegister)

userRouter.post('/login', userLogin)

// userRouter.post('/logout', userRegister)

export default userRouter;