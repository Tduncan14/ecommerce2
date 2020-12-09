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


exports.remove = (req,res) => {


    let product = req.product

    product.remove((err,deletedProduct) =>{ 

          if(err){

            return res.status(400).json({
                error:errorHandler(err)
            })
          }


          res.json({

              message:"Product is deleted"
          })


    })






}


exports.update =(req,res) =>{

    // how to handle pictures

    let form = new formidable.IncomingForm()

    form.keepExtensions = true
    

    //so you can parse the req


    form.parse(req,(err,fields,files)  => {

        if(err){

            return res.status(400).json({

                error: 'Image could not upload'

            })
        }


         // checking out the fields


         const {name,description,price,category,shipping,quantity} = fields


         if(!name || !description || !price || !category || !shipping || !quantity){


             return res.status(400).json({

                error:"All fields are required"


             })




         }

          let product = req.product

          // update the old product using lodash
          product = _.extend(product,fields)


          if(files.photo){

            console.log('Files',files.photo)
          


          if(files.photo.size > 1000000){
  
            return res.status(400).json({
                error:"Image should less than 1mb in size"
            })

          }
        


          product.photo.data = fs.readFileSync(files.photo.path)
          product.photo.contentType = files.photo.type

          }


          product.save((err,result) =>{

              if(err){

                return res.status(400).json({
                    error:errorHandler(err)
                })
              }
                 
               res.json(result)
          })

    })

}


exports.list = (req,res) => {

  

    // query and grabbing by order

    let order = req.query.order ? req.query.order : 'asc'

    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    let limit = req.query.limit ? parseInt(req.query.limit) : 6


//     Product.find().exec((err,products) =>{

//       if(err){

//         res.status(500).json({

//             message:"bad call to the server"
//         })


//       }

//   }) 


   Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,products) =>{

        if(err){
            return res.status(400).json({
                err:'Product not found'
            })
        }

        res.json(products)
    })


//   return products


}


exports.listRelated = ( req,res) =>{

    //  It will find the products based on the req products category
    //  other products that has the same category, will be returned
    // 

     let limit = req.query.limit ? parseInt(req.query.limit) : 6;


        // queruy the product by relation
     Product.find({_id:{$ne:req.product},category:req.product.category})
     .limit(limit)
     .populate('category','_id name')
     .exec((err,products) =>{

        if(err){

            return res.status(400).json({
                error:"Products not found"
            })
        }


         res.json(products)



     })
}


// products based on sale // arrival
// by sell = /products?sortBy=sold&order=desc&limit=4



// by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if not params are sent, then all products are returned


