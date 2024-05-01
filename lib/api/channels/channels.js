const base = require('../base')
const parseResponse = require('./parseResponse')
const PATH1 = 'channels-index'
const PATH2 = '/from/worldwide/top/'

const channels = async ({country='',page}={}) =>{
    if (country!= '') {
        country = `/${country}`
    }
    if (page==1) {
        page = 0
    } else {
        page = page-1
    }
    try {
        const request = base.createRequest()
        return parseResponse(await request.get(`${PATH1}${country}${PATH2}${page}`))
    } catch (error) {
        throw `Error: ${error}`
    }
}
module.exports= channels