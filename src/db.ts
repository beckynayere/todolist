import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://nayere:l89uVoQqbHFrznrc@atlascluster.1pkzt9h.mongodb.net/"
        )
        if (connection) {
            console.log("Connection established")
        }
    }catch (error) {
        console.log("error in connectToDatabase, error")
        throw error
    }
}

// const connectToDatabase = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGODB_URI!, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         if (connection) {
//             console.log("Connection established");
//         }
//     } catch (error) {
//         console.log("Error in connectToDatabase:", error);
//         throw error;
//     }
// }
export default connectToDatabase;