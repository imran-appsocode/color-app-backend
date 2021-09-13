
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


/*
*
*
* Themes schema
*
*/
const shortcutObject = { name: String, id: String, shortcutImage: String, useCount: Number }
const themesSchema = new Schema({
    "id": String,
    "categoryId": String,
    "name": String,
    "image": String,
    "backgroundImage": String,
    "backgroundColor": String,
    "favourites": [{type: String}],
    "icons":[{id: String, imageURL: String, iconImage: String, iconStyle: String, iconColor: String, shortcut: shortcutObject}]

}, { timestamps: true });


/*
*
*
* Themes model
*
*/
class themes {
    static async insertTheme(data){
        try{
            let logs = this.create(data)
            return logs
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async findTheme(id){
        try{
            let user = this.findOne({id: id}).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async deleteTheme(id){
        try{
            let user = this.findOneAndDelete({id: id}).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }
    static async updateThemeData(filter, update){
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
    static async findAllThemes(query){
        try{
            let user = this.find(query).lean()
            return user;
        }catch(err){
            console.log(err)
            throw err
        }
    }


}
themesSchema.loadClass(themes)
let themesCollection = mongoose.model('themes', themesSchema);
module.exports = themesCollection
