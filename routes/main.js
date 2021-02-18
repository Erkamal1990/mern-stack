var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const registerValidation = require('../middleware/registerValidation');
var multer  = require('multer');
var fileUpload = require('../middleware/fileupload');
router.get('/login', function(req, res) {
  res.render('login', { title: 'login Page' });
});

router.get('/register', function(req, res) {
  res.render('register', { title: 'Register Page',message:''});
});
var upload = multer({ 
  storage: fileUpload.files.storage(),
  fileFilter:fileUpload.files.allowedFile
  }).single('profileImg');

router.post('/register',registerValidation.registerform,upload,(req,res) =>{
    var errors = validationResult(req);
    
    if(!errors.isEmpty()){
      var errMsg = errors.mapped();
      res.render('register', { title: 'Register Page',message:errMsg});
    } else {
      
        res.redirect('/register');
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
