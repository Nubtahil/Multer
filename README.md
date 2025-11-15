Multer is npm package which is use to store images and other files to server's disk. It doesn't store images directly in the database... wait then how we store our images in database 
ANSWER: using path name of image file we store it on database
Explanation :
"destination" and "filename" are the properties of multer.diskstorage in which we tell where to store the the image and what will be the name of the image file.
With the help of these properties we give path to image file then we store that path in DB.
Also we can control what type of file extension is allow to store like pdf, jpeg etc
