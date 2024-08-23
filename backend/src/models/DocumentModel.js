import mongoose from "mongoose";

 const DocumentSchema = new mongoose.Schema(
  {
    title: String,
    // content: {type: String},
    file: {type: String, required: true},
    lastModified: {type: Date,default: Date.now},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", }],
  },
  { timestamps: true }
);

export const documentModel = mongoose.model("Document", DocumentSchema);
