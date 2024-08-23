import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username : { type: String, required: true },
   email : {type : String , unique : true , required : true},
   password : {type :String, required : true},
   role : {type : String , enum : ['Admin', 'User'] , default : 'User'}
},
{
    versionKey: false
});

export const UserModel = mongoose.model('User', UserSchema);
