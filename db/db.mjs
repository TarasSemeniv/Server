import mongoose from "mongoose";

mongoose.connect('mongodb+srv://test:test@cluster0.amd5wlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

export default mongoose.connection;