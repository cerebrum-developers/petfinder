var express = require('express');
var router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const HTTPStatus = require("http-status");
const mongoose = require('mongoose');
let jwt         = require('jsonwebtoken');
const config        = require('config');
const token_config  = config.get('JWT');


module.exports = (app, wagner) => {

  let authMiddleware = wagner.get("auth");

  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });


  router.post('/addAnimal', async (req, res, next) => {
    try{
      var request = req.body;
      console.log(Object.keys(request).length);
        if(Object.keys(request).length){
          let insert = await wagner.get('animal_manager').insert(req.body);
          res.status(HTTPStatus.OK).json({ success: '1', message: "Data.", data: "Data added successfully." });            
        }else{
          res.status(400).json({ success: '0', message:"Invalid parameters.", data: "" });            

        }
     
    }catch(e){
        console.log(e)
        res.status(500).json({ success: '0', message: "failure", data: e });
    } 
  });

  router.get('/animalList', async (req, res, next) => {
    try{
      let sort = {'_id' : JSON.parse(req.query.sort)};
      let reqQuery = req.query;
      let jsonObj      = {};
      
      function strToObj(str){
          var obj      = {};
          if(str&&typeof str ==='string'){
              var objStr = str.match(/\{(.)+\}/g);
              eval("obj ="+objStr);
          }
          return obj
      }
        let conds = {"is_deleted":0};
        let animalData = await wagner.get('animal_manager').findAllPaginate(jsonObj, sort, req.query.pageNumber, req.query.recordsLimit);
        if(animalData){
          res.status(HTTPStatus.OK).json({ success: '1', message: "Data List.", data: animalData });            

        }else{
          res.status(400).json({ success: "0", message: "data not found", data:  ""});

        }
     
    }catch(e){
        console.log(e)
        res.status(500).json({ success: '0', message: "failure", data: e });
    } 
  });


  router.post('/editAnimal', async (req, res, next) => {
    try{
        var request = req.body;
        console.log(Object.keys(request).length);
        if(Object.keys(request).length == 0){
          res.status(400).json({ success: '0', message:"Invalid parameters.", data: "" });            
        }
        let conds = { "_id": req.body.animal_id};
        let animalData = await wagner.get('animal_manager').find(conds);
        if(animalData){
          let request = req.body
          delete request.animal_id;
          let animalUpdateData = await wagner.get("animal_manager").update(request, conds);
          res.status(HTTPStatus.OK).json({ success: '1', message: "Data.", data:"Data updated successfully." });            
        }else{
          res.status(400).json({ success: "0", message: "data not found", data:  ""});

        }
     
    }catch(e){
        console.log(e)
        res.status(500).json({ success: '0', message: "failure", data: e });
    } 
  });


  router.post('/deleteAnimal', async (req, res, next) => {
    try{
        let conds = { "_id": req.body.animal_id};
        let animalData = await wagner.get('animal_manager').find(conds);
        if(animalData){
          let request = req.body
          delete request.animal_id;
          let animalUpdateData = await wagner.get("animal_manager").update(request, conds);
          res.status(HTTPStatus.OK).json({ success: '1', message: "Data.", data:"Data deleted successfully." });            

        }else{
          res.status(400).json({ success: "0", message: "data not found", data:  ""});

        }
     
    }catch(e){
        console.log(e)
        res.status(500).json({ success: '0', message: "failure", data: e });
    } 
  });


  return router;
}

