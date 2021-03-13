var multer = require('multer');
module.exports.files={
    storage:function(){
        var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/profilepicture/')
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, new Date().valueOf()+'-' + fileName)
        }
            })
      
      return storage;
},
allowedFile:function(req, file, cb) {
    
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only  files are allowed!';
    }
    cb(null, true);
}
}