var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const registerValidation = require('../middleware/registerValidation');
var multer  = require('multer');
var fileUpload = require('../middleware/fileupload');
const bcrypt = require("bcrypt");
var User  =  require("../model/User");
// var userLogin  =  require("../model/userLogin");
var userCheck  =  require("../model/userCheck");

router.get('/login', function(req, res) {
  res.render('login', { title: 'login Page' });
});
  // login route
  // router.post("/login", async (req, res) => {
  //   const body = req.body;
  //   const user = await User.findOne({ email: body.email });
  //   if (user) {
  //     // check user password with hashed password stored in the database
  //     const validPassword = await bcrypt.compare(body.password, user.password);
  //     if (validPassword) {
  //       res.status(200).json({ message: "Valid password" });
  //     } else {
  //       res.status(400).json({ error: "Invalid Password" });
  //     }
  //   } else {
  //     res.status(401).json({ error: "User does not exist" });
  //   }
  // });

router.get('/register', function(req, res) {
  res.render('register', { title: 'Register Page',message:'',data:''});
});
var upload = multer({ 
  storage: fileUpload.files.storage(),
  }).single('profileImg');

router.post('/register',upload,registerValidation.registerform, async (req,res, next) =>{
    var errors = validationResult(req);
    console.log(errors);
    var errMsg;
    if(!errors.isEmpty()){
        errMsg = errors.mapped();
      res.render('register', { title: 'Register Page',message:errMsg,data:req.body});
    } else {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
      const UserSchemaObj = new User({
            fristName:req.body.fristName,
            lastName:req.body.lastName,
            email:req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            gender:req.body.gender,
            dob:req.body.dob,
            skills:req.body.skills.toString(),
            profileImg:req.file ? req.file.filename:'',
          });
            const getUser = userCheck.findOne({ email: req.body.email });
            console.log(getUser);
            var postData,message;
            if (!getUser) {
              UserSchemaObj.save().then((doc) => {
                message = "User successfully register.";
                postData = '';
                res.redirect("/login");
            });
            } else {
              message =  "Email address already use. Try another email.";
              postData = req.body;
              res.render('register', { title: 'Register Page',message:message,data:postData});
            }
    }
})

/* GET home page. */
router.get('/', isLoggedIn, (req, res) => {
  res.render('dashboard', { title: 'Dashboard Page'});
});
router.get('/users', isLoggedIn, (req, res) => {
  res.render('users',{title:'User List'})
});

// redirect middelware
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}

module.exports = router;
