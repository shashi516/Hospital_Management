import { Message } from "../models/messageSchema.js";
import {CatchAsyncError} from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";

export const sendmessage=CatchAsyncError(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body; 
    if(!firstName|| !lastName|| !email|| !phone|| !message){
        return next (new ErrorHandler("Please Fill full form!",400))
        
    }
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"Message send successfully!"
    });
});

export const GetAllMessages=CatchAsyncError(async(req,res,next)=>{
    const messages= await Message.find();
    res.status(200).json({
        success:true,
        messages,
    });
});

export const deleteMessage=CatchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    let messages=await Message.findById(id);
    if(!messages){
        return next(new ErrorHandler("Message NotFound",400));
    }
    await messages.deleteOne();
    res.status(200).json({
        success:true,
        message:"message Deleted Successfully!",
    });
});