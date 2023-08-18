const SingleFile = require("../models/singlefile");
const MultipleFile = require("../models/multiplefile");
const { v4 : uuidv4 }= require('uuid')


const singleFileUpload = async (req, res, next) => {
  try {
    const data = new SingleFile(req.body);
    if(req.file !== undefined){
data.file=req.file.filename
    }
    await data.save();
    res.status(201).send({
      success: true,
      message: "Data saved successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const multipleFileUpload = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file ={_id: uuidv4(), filesname : element.filename}
      filesArray.push(file);
    });
    const multipleFiles = new MultipleFile({
      title: req.body.title,
      files: filesArray,
    });
    await multipleFiles.save();
    res.status(201).send({
      success: true,
      message: "Multiple Files saved successfully",
      data: multipleFiles,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallSingleFiles = async (req, res, next) => {
  try {
    const files = await SingleFile.find();
    res.status(200).send({
      success: true,
      message: "Get single successfully",
      data: files,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await MultipleFile.find();
    res.status(200).send({
      success: true,
      message: "Get multiple files successfully",
      data: files,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
};
