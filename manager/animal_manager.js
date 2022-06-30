const bcrypt          = require('bcryptjs');
const config          = require('config');
let jwt         = require('jsonwebtoken');
const token_config  = config.get('JWT');
//const account_confirmation = require("../email_templates/account-confirmation.html")

class animal_manager {

    constructor(wagner) {
    	this.Animal = wagner.get("Animal");
    }

	find(req){
	    return new Promise(async (resolve, reject)=>{
	      	try{
		        let animal  = await this.Animal.findOne(req);
		        resolve(animal)
	      	} catch(error){
	        	reject(error);
	        }
	    })
	}

	insert(req){
	    return new Promise(async (resolve, reject)=>{
	      	try{
		        let animal = await this.Animal.create(req);
		        resolve(animal)
	      	} catch(error){
	      		reject(error);
	        }
	    })
	}

	



	
    update( conds, request){
	    return new Promise(async (resolve, reject)=>{
	      	try{
				  console.log("hiii");
				  console.log(conds)
				  console.log(request)
		        let animal  = await this.Animal.findByIdAndUpdate(
		        	request,
					conds		        	
		        );
		        resolve(animal)
	      	} catch(error){
	        	console.log(error);
	        	reject(error);
	        }
	    })
	}

	

	async findAllPaginate(conds, sort, pageNumber, numberRecord){
	    return new Promise(async (resolve, reject)=>{
            try{

                let pipeLine = [
                    {
                        $match :  conds
                    },
                    {$sort: sort},
                    {
                        $facet : {
                            page: [{$count: "count"}],
                            Animal: [
                                
                                {$skip: pageNumber ? parseInt(numberRecord) * (pageNumber - 1):0 },
                                {$limit: parseInt(numberRecord)},
                            ]
                        }
                    },
                    {
                        $project: {
                            count: {$arrayElemAt: ["$page.count", 0]},
                            listing: "$Animal"
                        }
                    }
                ];
                let animal  = await this.Animal.aggregate(pipeLine);
                resolve({animal:animal[0].listing, page:Math.ceil(animal[0].count / parseInt(numberRecord)), count:animal[0].count})
            } catch(error){
              console.log(error)  
              reject(error);
            }
        }) 
    }

	findAll(req){
	    return new Promise(async (resolve, reject)=>{
	      	try{
		        let animal  = await this.Animal.find(req);
		        resolve(animal)
	      	} catch(error){
	        	reject(error);
	        }
	    })
	}

	
}

module.exports  = animal_manager;