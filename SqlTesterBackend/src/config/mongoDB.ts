import mongoose from 'mongoose'

export const connectDB = async(): Promise<void> => {

    const mongoURI = process.env.MONGO_URI!;
    try {
        const connection = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected ${connection.connection.host}`);
    } catch (error: any) {
        console.log("Connection Failed",error?.message);
        process.exit(1);
    }
}