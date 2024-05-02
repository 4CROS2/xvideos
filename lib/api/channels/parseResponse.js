const cheerio = require('cheerio')
const parseChannel = require('./parseChanel')
const createHasNextFunction = require('../videos/best/createHasNextFunction')
const createHasPreviousFunction = require('../videos/best/createHasPreviousFunction')

const getChannels = ($) => {
    const data = $('.mozaique .thumb-block').map(
        (i, channel) => parseChannel($, channel)).get()
    return data
}

const getPagination = ($) => {
    const pages = $('.pagination:nth-child(3) ul li:not(.no-page):not(:has(a.no-page))')
        .map(
            (i, page) => parseInt($(page).text(), 10)
        ).get()
    const page = parseInt($('.pagination:nth-child(3) ul li .active').text())
    return {
        page,
        pages,
        hasNext:createHasNextFunction({page,pages}),
        hasPrevious:createHasPreviousFunction({page,pages})
    }
}

const parseResponse = ({ data }) => {
    const $ = cheerio.load(data)
    const channels = getChannels($)
    const pagination = getPagination($)
    return {
        pagination,
        channels, 
    }

}
module.exports = parseResponse