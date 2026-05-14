import mongoose,{Schema,Document,Model} from "mongoose";
interface IUser{
    title : string,
    description : string
}
const UserSchema = new Schema<IUser>({
    title : {
        type : String,
        required : [true, "Please provide a name"]
    },
    description : {
         type : String,
        required :[true , "Please provide a description"]
    }
})

const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("user",UserSchema)
 
export default User