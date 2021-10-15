const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('file:///C:/Users/jbello/Documents/pdf/formato.html')
    await page.pdf({path: 'haiwi.pdf', format: 'A4',printBackground: true})
    await browser.close()
})()