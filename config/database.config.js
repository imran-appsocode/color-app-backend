const mongoose = require('mongoose');

module.exports = async () => {
  console.log('in database file')
    try {
        const url = `mongodb://localhost:27017/aa-color`;
        const dbConnection = await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        if(dbConnection)
        {
            console.info('connected to db AA color ')
        }else{
            console.warn('disconnected')
        }
    } catch (error) {
        throw new Error(error);
    }
}