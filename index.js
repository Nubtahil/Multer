const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({extended:false})) 
app.set("view engine", "ejs")  


const storage = multer.diskStorage(
  {
       destination:(req,file,cb)=>{
       cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
     const newFileName = Date.now() + path.extname(file.originalname)
     cb(null,newFileName)
    }
  }
) 
//file.mimetype("image/")
//file.mimetype === "image/" || file.mimetype === "image/png" 


const fileFilter = (req,file,cb) =>{
    if (file.mimetype.startsWith("image/")) {    
  cb(null, true); // accept file
} else {
  cb(new Error("Only image files are allowed!"), false);
}
  }




const upload = multer({
    storage : storage,
    limits:
    {
       fileSize: 1024 * 1024 * 3
    },
    fileFilter:fileFilter
})

 
app.get("/", (req,res)=>{
    res.render("form")
})

app.post("/submitform",upload.single("userfile"),(req,res)=>{
    if(!req.file || req.file.length === 0)
    {
       return res.status(400).send("file not uploaded.") 
    }
    res.send(req.file)
},  )  
   

app.use((error , req, res, next)=>{
   if(error instanceof multer.MulterError){
    if(error.code === "LIMIT_UNEXPECTED_FILE"){
     return res.status(400).send("too many files uploaded!!")
  }
    return res.status(400).send(`multer error: ${error.message} :  ${error.code}`)
   }else if(error){
     return res.status(500).send(`something went wrong: ${error.message}`)

   }
  
} )
app.listen("5000",
    console.log("server running on port 5000")
)




//this below code is for multiple input fields

 
// const fileFilter = (req,file,cb) =>{
//     if(file.fieldname === "userfile"){ 
//      if (file.mimetype.startsWith("image/")) {
//      cb(null, true); // accept file
//      } else {
//      cb(new Error("Only image files are allowed!"), false);
//      }    

//     }
//     else if(file.fieldname === "userdocumnets"){
//         if (file.mimetype.startsWith("application/pdf")) {
//      cb(null, true); // accept file
//      } else {
//      cb(new Error("Only PDF files are allowed!"), false);
//      }  

//     }
//     else{
// cb( new Error("Unkown field"), false)
//     }
// }