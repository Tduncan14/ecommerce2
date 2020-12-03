const Product = require("../Models/Product");
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs')
const {errorHandler} = require('../Helpers/Dberror')


// finding a single product


exports.productById = (req,res,next,id) => {



    console.log('getting data from the database')
    Product.findById(id).exec((err,product) => {


      if(err || !product){


        return res.status(400).json({

            error:"product not found"
        })
      }
       req.product = product
       next();
    })

    

}

// reading the product


exports.read = (req,res) => {

    req.product.photo = undefined

    console.log('trying to read the product')

    return res.json(req.product)



}










exports.create = (req,res) => {


    // how to handle pictues
    let form = new formidable.IncomingForm()
    
    form.keepExtensions = true

    // so you can parse the req

    form.parse(req,(err,fields,files) =>{

        if(err){
             return res.status(400).json({

                error:'Image could not be uploaded'

             })


        }

        // check all the fields

        const {name,description,price,category,shipping,quantity} = fields


        if(!name || !description || !price || !category || !shipping || !quantity){


            return res.status(400).json({


          error:"All fields are required"

            })

        }


       let product = new Product(fields)
 
    // handle the photo
       if(files.photo){
           console.log('Files Photo', files.photo)

        if(files.photo.size > 1000000){

            return res.status(400).json({
                error:"Image should be less than 1mb in size"
            })


        }
         product.photo.data = fs.readFileSync(files.photo.path)
         product.photo.contentType = files.photo.type


       }

       product.save((err,result) => {

          if(err){
              return res.status(400).json({
                  error:errorHandler(err)
              })
          }


          res.json(result)
       });

    });
};