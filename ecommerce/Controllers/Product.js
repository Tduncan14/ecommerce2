const Product = require("../Models/Product");
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs')
const {errorHandler} = require('../Helpers/Dberror');
const { raw } = require("body-parser");


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


exports.listCategories = (req,res) =>{

    Product.distinct("category",{}, (err,categories)=>{


        if(err){

            return res.status(400).json({
                error:"Products not found"
            })
        }

        res.json(categories)


    })




}



/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
// route - make sure its post

// by search filters from the client side
 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


// return the product photo

exports.photo = (req,res,next) =>{

    if(req.product.photo.data){

        res.set('Content-type',req.product.photo.contentType)
         return res.send(req.product.photo.data)

    }

    next()


}


// products based on sale // arrival
// by sell = /products?sortBy=sold&order=desc&limit=4



// by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if not params are sent, then all products are returned


