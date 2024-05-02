const base = require('../base')
const { webkit } = require('playwright')

const parseResponse = require('./parseResponse')
const PATHROUTE = '#_tabVideos,rating,page-'
const channelDetail = async ({path='',page=0, timeOut = 2000}={})=>{
    let pg = page
    try {
        const browser = await webkit.launch()
        const context = await browser.newContext()
        const pageInstance = await context.newPage()
        await pageInstance.goto(`${base.BASE_URL}${path}${PATHROUTE}${pg}`)
        await pageInstance.waitForTimeout(timeOut)
        const data = await pageInstance.content()
        await browser.close()
        return parseResponse({ data })
    } catch (error) {
        throw `Error: ${error}`
    }
}

module.exports = channelDetail