import mongoose from "mongoose";
import validator from "validator";

const AppointmentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[1,"first Name must be required!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[1,"Last Name must be required!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please povide a vailid Email!"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone number must be 10 digit!"],
        maxLength:[10,"Phone number must be 10 digit!"]
    },
    nic:{
        type:String,
        required:true,
        minLenght:[12,"nic must contain 12 digits"],
        maxLenght:[12,"nic must contain 12 digits"]
    },
    dob:{
        type:Date,
        required:[true, "Date of Birth is Required!"]

    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
   appointment_date:{
    type:String,
    required:true,
   },
   department:{
    type:String,
    decodeURI:true,
   },
   doctor:{
    firstName:{
        type:String,
        required:true
        },
    lastName:{
        type:String,
        required:true,
        }
   },
   hasVisited:{
    type:Boolean,
   default:false
   },
   doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,
   },
   patientId:{
    type:mongoose.Schema.ObjectId,
    required:true,
   },
   address:{
    type:String,
    required:true,
   },
   status:{
    type:String,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending",
   }
});

export const Appointment=mongoose.model("Appointment",AppointmentSchema);
 