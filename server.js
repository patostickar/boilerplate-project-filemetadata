"use strict";

var express = require("express");
var cors = require("cors");
var multer = require("multer");
var app = express();
var upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) => {
  try {
    if (!req.file) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let file = req.file;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      // avatar.mv('./uploads/' + avatar.name);

      //send response
      res.json({
        name: file.originalname,
        size: file.size
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(process.env.PORT || 3000, function() {
  // console.log('Node.js listening ...');
});
