"use strict"

const mongoose  = require('mongoose'),
      Schema    = mongoose.Schema;
     

let AnimalSchema = new Schema({
  organization_id                : {type: String, required: false},
  url            : {type: String, required: false},
  type             : {type: String, required: false},
  species             : {type: String, required: false},
  breeds             : {type: {}, required: false},
  colors             : {type: {}, required: false},
  age        : {type: String, required: false},
  gender         : {type: String, required: false},
  size      : {type: String, required: false},
  coat: {type: String, required: false},
  attributes              : {type: {}, required: false}, 
  environment               : {type: {}, required: false}, 
  tags               : {type: [], required: false},
  name : {type:String, required: false},
  description : {type: String, required: false},
  photos : {type: [{}], required: false},
  videos : {type: [{}], required: false},
  status : {type: String, required: false},
  published_at : {type : Date, default: Date.now},
  contact : {type: {}, required: false},
  links : {type: {}, required: false},
  is_deleted : {type: Number, required: true, default: 0},
},{ timestamps : true });

module.exports = mongoose.model('Animal', AnimalSchema);

