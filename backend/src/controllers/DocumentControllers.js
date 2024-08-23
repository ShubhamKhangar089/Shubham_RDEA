import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime-types';
import { documentModel } from '../models/DocumentModel.js';

const uploadDir = './uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = mime.lookup(file.originalname);
  if (!fileType || !['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'text/plain'].includes(fileType)) {
    return cb(new Error('Only document files are allowed!'));
  }
  cb(null, true);
};

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter });

export const createDocument = async (req, res) => {
  try {
     upload.single('file')(req, res, async(err)=>{
        if(err) return res.status(404).json("file Not Found");
    

    const { title } = req.body;
    console.log("title:", title);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // const documentId = uuidv4();
    const document = new documentModel({
      title,
      file: file.filename,
      owner: req.user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await document.save();
    res.status(201).json(document);
});
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
      // try {
    //     const { title, content } = req.body;
    //     if (!title || !content || typeof content !== 'object') {
    //       return res.status(400).json({ message: "Title and content are required, and content must be an object" });
    //     }
    //     const document = new documentModel({
    //       title,
    //       content: JSON.parse(JSON.stringify(content)), // deep clone the content object
    //       owner: req.user._id,
    //     });
    //     await document.save();
    //     res.status(201).json(document);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ success: false, error: error.message });
    //   }
    // try {
    //     console.log(req.user)
    //     const document = new documentModel({
    //         title: 'Untitled Document',
    //         content: {},
    //         owner: req.user.id,
    //     });
    //     await document.save();
    //     res.status(200).json(document);
    // } catch (error) {
    //     res.status(500).json({success: false, error : error}) 
    // }

export const renameDocument = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const document = await documentModel.findByIdAndUpdate(id, { title }, { new: true });
    res.json(document);
};

export const deleteDocument = async (req, res) => {
   try {
    const { id } = req.params;
    await documentModel.findByIdAndDelete({_id :id});
    res.json({ message: 'Document deleted' });
   } catch (error) {
    res.status(500).json({success: false, error : error}) 
   }
};



export const getAllDocuments = async (req, res) => {
    try {
        const documents = await documentModel.find();
        if (!documents) {
          return res.status(404).json({ message: "Docs Not Found" });
        }
        res.status(200).json(documents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
      }
    
};

export const getDocuments = async (req, res) => {
    const { id } = req.params;
    try {
        const documents = await documentModel.find({ owner : id});
        if (!documents) {
          return res.status(404).json({ message: "Docs Not Found" });
        }
        res.status(200).json(documents);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
      }
    
};