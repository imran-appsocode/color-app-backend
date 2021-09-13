const logsModel = require('../models/categories.model')
const { v4: uuidv4 } = require('uuid');


const addNewLogs = async (resultData, apiName) => {
    try {
        const logsObject = {
            uuid: uuidv4(),
            type: 'Success',
            name: apiName,
            message: 'No message yet',
            result: resultData
        }

        await logsModel.insertAuditLogs(logsObject)
    } catch (err) {
        throw err
    }
}


module.exports = {
    addNewLogs: addNewLogs
}