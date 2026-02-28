import { connectDB } from "./config/mongoDB";
import { connectPostgre } from "./config/postgre";
import dotenv from 'dotenv'
import app from './app'

dotenv.config();

const PORT = process.env.PORT || 5000

const server = async(): Promise<void> => {
    try {
        
        await connectDB();
        await connectPostgre();
        app.listen(PORT, ()=>{
            console.log(`App listening on port ${PORT}`)
        })
        
    } catch (error: any) {
        console.error('Error connecting server',error?.message)
    }
}

server();


