
const Category = require('../Models/Catergory');
const {errorHandler} = require('../Helpers/Dberror');


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