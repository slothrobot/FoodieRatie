const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require('./model/user');
const config = require('./config/keys');
const {auth} = require('./middleware/auth');

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
    user.save((err,userData)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true
        });
    });
});

app.post('/api/user/login',(req,res)=>{
    //find the email in my database
    User.findOne({email: req.body.email}, (err, user)=>{
        if(!user){
          return res.json({
            loginSuccess: false,
            message: "Auth failed, email not found"
        });
        }
    //check if the password is right
    user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch){
            return res.json({loginSuccess:false, message:"wrong password"})
        }
    });
    //generate token
    user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        res.cookie('x_auth', user.token)
            .status(200)
            .json({
                loginSuccess: true
            });
    });
  });
});

app.get('/api/user/logout', auth, (req, res)=>{
    //find the user logged in and remove user's token
    User.findOneAndUpdate({_id: req.user._id}, {token:''}, (err, doc)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        });
    });
})

const port = process.env.PORT || 5000 

app.listen(port, console.log(`server running on port ${port}`));