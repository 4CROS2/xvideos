const cheerio = require('cheerio')
const parseVideo = require('./parseVideo')

const getData = ($) => {
    const name = $('#profile-title > h2 > strong').text()
    const thumbNail = $('.profile-pic img').attr('src')
    const count = $('#profile-title > div.mobile-hide.top-right > div.user-actions > span > span.count').text()
    const videosLength = $('#tab-videos > span.navbadge').text()
    return {
        name,
        thumbNail,
        count,
        videosLength
    }
}


const getVieos = ($) => {
    return $('#tabVideos > div.mozaique.cust-nb-cols.post-blocks > div.thumb-block.tb_full_init.tbm-init-ok')
        .map((i, video) =>
            parseVideo($, video)
        ).get()
}
const getPages = ($) => {
    const pages = $('#tabVideos > div.mozaique.cust-nb-cols.post-blocks > div:nth-child(1) > ul > li > a:not(.next-page):not(.prev-page)')
        .map(
            (i, page) => parseInt($(page).text().trim(), 10)
        ).get()
    const page = parseInt($('#tabVideos > div.mozaique.cust-nb-cols.post-blocks > div:nth-child(1) > ul > li > a.active').text().trim(),10)
    return {
        page,
        pages
    }
}

const parseResponse = ({ data }) => {
    const $ = cheerio.load(data)
    const page = getData($)
    const videos = getVieos($)
    const pagination = getPages($)
    return {
        pagination,
        name: page.name,
        thumbNail: page.thumbNail,
        count: page.count,
        videosLength: page.videosLength,
        videos,
    }
}

module.exports = parseResponse