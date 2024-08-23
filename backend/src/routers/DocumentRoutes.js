import express from 'express';

import { createDocument, deleteDocument, getAllDocuments, getDocuments, renameDocument } from "../controllers/DocumentControllers.js";
import { isAuth } from "../middlewares/AuthMiddleware.js";

const documentRouter = express.Router();
documentRouter.get('/all',isAuth(['Admin']), getAllDocuments);
documentRouter.get('/get/:id', isAuth(['Admin', 'User']), getDocuments);
documentRouter.post('/createDoc',isAuth(['Admin', 'User']), createDocument);
documentRouter.patch('/update/:id',isAuth(['Admin', 'User']), renameDocument);
documentRouter.delete('/delete/:id',isAuth(['Admin', 'User']), deleteDocument);

export default documentRouter;