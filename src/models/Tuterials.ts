import * as mongoose from 'mongoose'
import { model } from 'mongoose';

const Tuterials = new mongoose.Schema({
    
    title:{type:String,required:true},
    description:{type:String,required:true},
    published:{type:Boolean,required:false},
    created_at:{type:Date,required:true,default: new Date()},
    updated_at:{type:Date,required:true,default: new Date()},
});

export default model('Tuterial',Tuterials);