/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const newFresh = async ({ url, puppeteerConfig } = {}) => {
  let browser;

  try {
    browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();
    await page.goto('https://www.xvideos.com/');
    const html = await page.content();
    const $ = cheerio.load(html);
    const $getVideos = cheerio.load($.html());
    const mozaique = $getVideos('.thumb-block');
    const videos = mozaique.map((index, element) => {
      const $element = $getVideos(element);
      const title = $element.find('.title a').attr('title');
      const url = `https://www.xvideos.com${$element.find('.title a').attr('href')}`;
      const thumbNail = $element.find('.thumb img').attr('src');
      const duration = $element.find('.duration').text();
      const channel = $element.find('.metadata .name').text();

      return {
        title,
        url,
        thumbNail,
        duration,
        channel,
      };
    }).get();
    return videos;
  } catch (e) {
    console.log(e);
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = newFresh;
