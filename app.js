import express from 'express'; // importing libs for express
import path from 'path';
import { fileURLToPath } from 'url';

const app = express(); //create instance of express
const port = 3000

//es module pathing for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json())

//serve frontend files from folder "public"
app.use(express.static(path.join(__dirname, 'public')));

//api test route
app.get('/api/health',(req, res)=>{
    res.json({status: "Dopamine Flow: Active"})
})

app.listen(port, () => {
    console.log(`🚀 Server running on: http://localhost:${port}`);
}); // creates the port which will run the server//creates the port which will run the server



