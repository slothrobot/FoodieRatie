const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require('./model/user');
const config = require('./config/keys');
const {auth} = require('./middleware/auth');
const {List} = require('./model/list');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI,
).then(()=>console.log('DB connected'))
.catch(err=>console.log(err));

app.get('/api/user/auth', auth, (req,res)=>{
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role
    });
});

app.post('/api/user/register', (req,res)=>{
    const user = new User(req.body);
    //check if the email is in the database
    User.findOne({email: req.body.email}, (err, newUser)=>{
        if(newUser){
          return res.status(400).json({
            success: false,
            message: "Email already registered, please login or use another email."
        });
        } 
        user.save((err,userData)=>{
            if(err) return res.status(400).json({success: false, message:'Please enter valid information.'});
             return res.status(200).json({
                success:true
            });
        });
    });
});

app.post('/api/user/login',(req,res)=>{
    //find the email in my database
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
          return res.status(400).json({
            loginSuccess: false,
            message: "Login failed, email not found."
        });
    } 
    //check if the password is right
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch){
                return res.status(400).json({loginSuccess:false, message:"Please enter the right password."});
            }   
    //generate token
        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            res.cookie('x_auth', user.userToken)
                .status(200)
                .json({
                loginSuccess: true,
                id: user._id,
                username: user.username,
                email: user.email,
                userToken: user.userToken
            });
        });
    });
  });
});

app.get('/api/user/logout', auth, (req, res)=>{
    //find the user logged in and remove user's token
    User.findOneAndUpdate({_id: req.user._id}, {userToken:''}, (err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        return res.status(200).send({
            success: true
        });
    });
});

app.get('/api/user/profile', auth, (req, res)=>{
    User.findById(req.user._id, (err, user)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.json({
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
            });
    });
});

app.post('/api/list/listNumber', auth, (req, res)=>{
    List.find({"foodId": req.body.foodId})
        .exec((err, list) =>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, listNumber: list.length});
        });
});

app.post('/api/list/onList', auth, (req, res)=>{
    List.find({"foodId": req.body.foodId, "userFrom": req.body.userFrom})
        .exec((err, list) =>{
            if(err) return res.status(400).send(err)
            //check if the user already added this product to list
            let result = false;
            if(list.length !==0){
                result = true
            }
            res.status(200).json({success: true, onList: result});
        });
});

app.post('/api/list/addToList', auth, (req, res) =>{
    const list = new List(req.body);
    list.save((err, doc) =>{
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    });
});

app.post('/api/list/removeFromList', auth, (req, res) =>{
    List.findOneAndDelete({"foodId": req.body.foodId, "userFrom": req.body.userFrom})
        .exec((err, doc) =>{
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        });
});

app.post('/api/list/getList', auth, (req, res) =>{
    List.find({"userFrom": req.body.userFrom})
        .exec((err, listItems) =>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, listItems})
        })
})

const port = process.env.PORT || 5000 

app.listen(port, console.log(`server running on port ${port}`));