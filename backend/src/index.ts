import * as dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response, Application} from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { authRouter, recipeRouter } from './routes';

const app:Application = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
//Not using Helmet so will use this as security middleware
app.use((req: Request, res: Response, next: Function) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
});

// From routes folder, goes to auth/router then to registerOrLogin function which is in auth/controllers
app.use("/auth", authRouter)
app.use("/recipe", recipeRouter)

// Routes to ping
app.get('/ping', (req: Request, res: Response)=>{
    res.send("pong");
})

// Error Handling for undefined routes
app.all('*', (req: Request, res:Response) => {
    res.status(404).json({message: 'Route requested not found.'})
})
// Error handling
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Connects MongoDB
const runDB= async()=>{
    connect(process.env.MONGODB as string)
    .then(()=> console.log("DB connected."))
    .catch(()=> console.log("DB did not connect."))
}

runDB()

const PORT = process.env.PORT as unknown as number || 5000

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})