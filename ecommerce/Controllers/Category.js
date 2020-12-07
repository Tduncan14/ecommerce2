
const Category = require('../Models/Catergory');
const {errorHandler} = require('../Helpers/Dberror');



exports.categoryById = (req,res,next,id) =>{


    // use the database to find the category from the database

    Category.findById(id).exec((err,category) =>
    {

        if(err || !category){

            res.status(404).json({

                error:'category does not exist'
               
            })


        }



       req.category = category


        next()

    })



}


exports.create = (req,res) => {

    const category = new Category(req.body)


    category.save((err,data) =>{
        if(err){
     
            return res.status(400).json({
                error:errorHandler(err)
            })
        }

        res.json({data})
    })
}


exports.read = (req,res) =>{


    return res.json(req.category)
}


exports.update = (req,res,id) =>{

    const category = req.category

    category.name = req.body.name


    category.save((err,data) =>{


        if(err){
            return res.status(400).json({

                error:errorHandler(err)
            });
        }

        res.json(data)

    })

   
}



exports.remove = (req,res) =>{

    const category = req.category

    category.remove((err,data) => {
 
        if(err){

            return res.status(404).json({

                message:"The category has already been deleted or not found"
            })
        }

     
        res.json({
            message:'Category deleted'
        })

    })

}



exports.list = (req,res) =>{

    Category.find().exec((err,data) =>{

        if(err){

            return res.status(400).json({

                error:errorHandler(err)
            })
        }


       res.json(data)

    })

}