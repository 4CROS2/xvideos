const base = require('../../base')
const parseResponse = require('./parseResponse')

const PATH = '/new/'

const newFresh = async ({ page = 0 } = {}) => {
    if (page < 1 || page > Number.MAX_SAFE_INTEGER) {
        throw new Error(`Invalid page: ${page}`)
    }
    if (page==1) {
        page = 0
    } else {
        page = page-1
    }
    try {
        const request = base.createRequest()
        

        return parseResponse(page, await request.get(`${PATH}${page}`))
    } catch (e) {
        console.log(e)
    }
}

module.exports = newFresh
