/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const puppeteer = require('puppeteer');

const newFresh = async ({ url, puppeteerConfig } = {}) => {
  let browser;
  try {
    browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const result = await page.evaluate(() => {
      const thumbs = document.querySelectorAll('.thumb');
      const titles = document.querySelectorAll('.title');
      const data = [];
      thumbs.forEach((thumb, index) => {
        const anchor = thumb.querySelector('a');
        const img = thumb.querySelector('img');
        const text = titles[index];
        const url = anchor ? anchor.href : null;
        let title;
        if (text) {
          title = text.textContent;
        }
        if (img) {
          const thumb = img.src;
          data.push({
            thumb,
            title,
            url,
          });
        }
      });
      return data;
    });
    return result;
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = newFresh;
