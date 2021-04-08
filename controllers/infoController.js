const Info = require('../model/Info');
const Education = require('../model/Education');
const Experience = require('../model/Experience');
const Skills = require('../model/Skills');
const User = require('../model/User');

// AJAX
const get_info = (req,res) => {
    console.log("Success");
}

const add_info = (req,res) => {
    res.render('addInfo');
}
const add_education = (req,res) => {
    res.render('addEducation');
}
const add_experience = (req,res) => {
    res.render('addExperience');
}
const add_skills = (req,res) => {
    res.render('addSkills');
}
const edit_info = async(req,res) => {
    const info = await Info.findOne({user_id: req.user._id,status:true});
    res.render('addInfo',{info});
}

const edit_education = async(req,res) => {
    const education = await Education.findOne({user_id: req.user._id});
    res.render('addEducation',{education});
}

const edit_experience = async(req,res) => {
    const experience = await Experience.findOne({user_id: req.user._id});
    res.render('addExperience',{experience});
}

const edit_skills = async(req,res) => {
    const skills = await Skills.findOne({user_id: req.user._id,status:true});
    res.render('addSkills',{skills});
}

const post_info = async(req,res) => {
    try {
        // console.log(req.user._id);
        const check = await Info.findOne({user_id: req.user._id, status: true});
        
        if(check){
            await Info.findByIdAndUpdate({_id:check._id},{status: false});
        }
        var info = req.body;
        info.address = {
            houseNumber: req.body.houseNumber,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        };
        info.user_id = req.user._id;
        info.status = true;
        console.log(info);
        const newInfo = new Info(info);
        const result = await newInfo.save();
        res.redirect('/api/user/get-info');
    } catch(e) {
        res.redirect('/api/user/info/add');
    }
}

const post_education = async(req,res) => {
    try {
        // console.log(req.user._id);
        var education = req.body;
        education.user_id = req.user._id;
        // console.log("education is "+education);
        const newEducation = new Education(education);
        const result = await newEducation.save();
        // res.send(result);
        res.redirect('/api/user/get-info');
    } catch(e) {
        // res.send(e);
        console.log(e);
        // res.redirect('/api/user/info/education');
    }
}

const post_experience = async(req,res) => {
    try {
        // console.log(req.user._id);
        var exp = req.body;
        exp.user_id = req.user._id;
        console.log(exp);
        const newExp = new Experience(exp);
        const result = await newExp.save();
        // res.send(result);
        res.redirect('/api/user/get-info');
    } catch(e) {
        res.send(e);
    }
}

const post_skills = async(req,res) => {
    try {
        const check = await Skills.findOne({user_id: req.user._id, status: true});
        
        if(check){
            await Skills.findByIdAndUpdate({_id:check._id},{status: false});
        }
        // console.log(req.user._id);
        var skills = req.body;
        skills.user_id = req.user._id;
        skills.status = true;
        console.log(skills);
        const newSkills = new Skills(skills);
        const result = await newSkills.save();
        // res.send(result);
        res.redirect('/api/user/get-info');
    } catch(e) {
        res.send(e);
    }
}

const get_details = async(req,res) => {

    try {
        const user = await User.findOne({_id: req.user._id});
        const info = await Info.findOne({user_id: req.user._id,status:true});
        const education= await Education.find({user_id: req.user._id});
        const experience = await Experience.find({user_id: req.user._id});
        const skills = await Skills.findOne({user_id: req.user._id,status:true});
        // res.send([user,education,experience,skills]);
        // console.log(experience);
        // console.log(url.parse(req.url, true).query);
        // console.log(education);
        res.render('show',{user,info,education,experience,skills});
    } catch (error) {
        res.send(error);
    }

}

module.exports = {
    post_info,
    post_education,
    post_experience,
    post_skills,
    get_details,
    add_info,
    add_education,
    add_experience,
    add_skills,
    edit_info,
    edit_education,
    edit_experience,
    edit_skills,
    get_info
}