import mongoose from "mongoose";
// import mongoose, { Schema, Document } from "mongoose";



const userSchema=new mongoose.Schema({
    name: {
        type:String,
        require:true,
    },
    email: {
        type : String,
        required :true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
},
 {
    timestamps: true,
}
)

const User = mongoose.model("User",userSchema)
// const User = mongoose.model<IUser>("User", UserSchema);
export default User;
