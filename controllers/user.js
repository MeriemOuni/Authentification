const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup
exports.signup =  async (req, res) => {
    try {
        // req.body => newuser
        const {name, email, password, phone} = req.body;
        const foundUser = await User.findOne({email});
        if(foundUser){
            return res.status(400).send({errors:[{msg: "Email should be unique try again"}]})
        }
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        // const newUser
        const newUser = new User({ ...req.body });
        newUser.password = hashedpassword;
        // save
        await newUser.save()
        // creation Token
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            {expiresIn: "1h"}
        );
        res.status(200).send({ msg:"Signup successfully", user: newUser, token})
    } catch (error) {
        res.status(400).send({errors: [{msg: "Can not register the User "}]})
    }
}

// signin
exports.signin=  async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if email exist
        const foundUser = await User.findOne({email});
        if(!foundUser){
            return res.status(400).send({errors:[{msg:"Bad credential !!!"}]})
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password);
        if(!checkPassword){
            return res.status(400).send({errors:[{msg:"Bad credential !!!"}]})
        }
        // creation token
        const token = jwt.sign(
            {
                id: foundUser._id,
            },
            process.env.SECRET_KEY,
            {expiresIn: "1h"}
        );
        res.status(200).send({msg:"Login successfully ...", user:foundUser, token})
    } catch (error) {
        res.status(400).send({errors:[{msg:"Can not Login !!!"}]})
    }
}