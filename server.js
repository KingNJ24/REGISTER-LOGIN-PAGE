const express = require('express');
const connectDb = require('./config/dbConnections')
const dotenv = require(`dotenv`).config();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const User = require('./models/userModel')

connectDb();

const app = express();
const port = 3000;
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.post('/', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!name|| !email || !password){
        
            res.status(400).send('All fields are required');
    }
    const emailExists =await User.findOne({email})
    if(emailExists){
        res.status(400).send('User already exists')
    }
    else{
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("name: " + name);
    console.log("Email: " + email);
    console.log("Password: " + hashedPassword);



    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })


    // Add a log statement to confirm user registration
    console.log("New user registered:", user);

    res.send('Form submitted successfully');}
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html');
})

app.post('/login',async (req,res)=>{
    
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email})
    
    if(user)
    {
        if(bcrypt.compare(user.password,password)){
            console.log(`User ${user} logged in`)
            res.send('User logged in');
        }
        else{
            console.log(`${user}'s Password is incorrect`);
            res.status(401).send('wrong password');
        }
    }
    else{
        console.log(`No such User exists with Email Id :${email}`);
        res.status(404).send('no such user')
    }
   
 })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
