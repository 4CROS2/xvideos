/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const newFresh = async ({ url, puppeteerConfig } = {}) => {
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const html = await page.content();
    const $ = cheerio.load(html);
    const data = $('div[class=mozaique]').html();
    const $getVideos = cheerio.load(data);
    const mozaique = $getVideos('.thumb-block');
    const videos = mozaique.map((index, element) => {
      const $element = $getVideos(element);
      const title = $element.find('.title a').attr('title');
      const url = `https://www.xvideos.com${$element.find('.title a').attr('href')}`;
      const thumbNail = $element.find('.thumb img').attr('src');
      const duration = $element.find('.duration').text();
      const name = $element.find('.metadata .name').text();

      return {

        title,
        url,
        thumbNail,
        duration,
        name,
      };
    }).get();
    return videos;
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = newFresh;
