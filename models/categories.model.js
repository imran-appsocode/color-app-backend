
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


/*
*
*
* Categories schema
*
*/

const categoriesSchema = new Schema({
    "id": String,
    "name": String,
    "order": Number,
}, { timestamps: true });


/*
*
*
* Categories model
*
*/
class categories {
    static async insertCategory(data){
        try{
            let logs = this.create(data)
            return logs
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async findCategory(id){
        try{
            let user = this.findOne({id: id}).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async deleteCategory(id){
        try{
            let user = this.findOneAndDelete({id: id}).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async updateCategoryData(filter, update){
        try{
            let user = this.findOneAndUpdate(filter, update, {
                new: true,
                safe: true
            }).lean()
            return user;
        }
        catch(err){
            console.log(err)
        }
    }
    static async findAllCategories(query){
        try{
            let user = this.find(query).sort( { "order": 1 } ).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }


}
categoriesSchema.loadClass(categories)
let categoriesCollection = mongoose.model('categories', categoriesSchema);
module.exports = categoriesCollection
