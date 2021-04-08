const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Joi = require('@hapi/joi');
const registerschema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
const loginschema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});



// REGISTER USER
const register_form = (req,res) => {
    res.render('register');
}

const register_user = async(req,res) => {
    console.log(req.body);
    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    let {error} = registerschema.validate(req.body);
    
    if (error){
        console.log(error.details[0].message);
       return res.status(400).send(error.details[0].message);
    }
    // CHECKING IF THE USER IS ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist)
    return res.status(400).send('User already exists');

    // HASH THE PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // CREATE NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
       const savedUser = await user.save();
    //    res.send(savedUser);
    res.redirect('/api/user/login');
    }catch(e){
       res.status(400).send(e);
    }
}

const login_form = (req,res) => {
    res.render('login');
}
// LOGIN USER 
const login_user = async(req,res) => {
    
        // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
        let {error} = loginschema.validate(req.body);
        if (error){
           return res.status(400).send(error.details[0].message);
        }
       
       // CHECKING IF THE USER EXISTS
       const user = await User.findOne({email: req.body.email});
       if(!user) {
           return res.status(400).send('Email not found');
       }
       
       //PASSWORD IS CORRECT
       const validPass = await bcrypt.compare(req.body.password,user.password);
       if(!validPass){
           return res.status(400).send('Invalid Password');
       }
   
       // CREATE AND ASSIGN A TOKEN
       const token = jwt.sign({_id: user._id,email: user.email,name: user.name}, process.env.TOKEN_SECRET);
       req.session.token = token;
       res.redirect('/api/user/get-info');
}

// POST USER
const post_user = (req,res) => {
    // res.json({
    //     posts: {
    //         title: 'First post',
    //         description: 'random data'
    //     }
    // });
    res.send(req.user);
}

// UPDATE USER

const update_form = (req,res) => {
    res.render('update');
}

const user_update = async(req, res) => {
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
            req.body.password = hashedPassword;
        }
        console.log(req.body);
        const result = await User.findOneAndUpdate({ _id: req.user._id },req.body);
        res.send(result);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
};

// DELETE USER  
const user_delete = async (req, res) => {
    const id = req.user._id;
    try {
      const result = await User.findByIdAndDelete(id);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
};

// LOGOUT USER
const user_logout = async (req,res) => {
    if(req.user.email){
        res.header('Cache-Control', 'no-cache');
        console.log(req.session);
        req.session.destroy((err) => {
            if(err){
                return console.log(err);
            }
            console.log(req.session);
            res.redirect('/api/user/login');
        })
    }
}

module.exports = {
    register_user,
    login_user,
    post_user,
    user_update,
    user_delete,
    register_form,
    login_form,
    update_form,
    user_logout
}
