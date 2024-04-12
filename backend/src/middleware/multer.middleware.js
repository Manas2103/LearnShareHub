import multer from "multer";

// for more info read the multer docs

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        //since the operation would be for very small time we can choose original name given by the user
        cb(null, file.originalname )
    }
  })
  
export const upload = multer({
    storage
})