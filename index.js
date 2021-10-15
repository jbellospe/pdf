const Fs = require('fs')  
const Path = require('path')  
const Util = require('util')  
const Puppeteer = require('puppeteer')  
const Handlebars = require('handlebars')  
const ReadFile = Util.promisify(Fs.readFile);

(async () => {
    try {
		const data = {
			name: 'Name Name Name'
		}
		const templatePath = Path.resolve('formato.html')
		const content = await ReadFile(templatePath, 'utf8')
		const template = Handlebars.compile(content)
		const html = template(data)
		const browser = await Puppeteer.launch()
		const page = await browser.newPage()
		await page.setContent(html)
		await page.pdf({path: 'haiwi.pdf', format: 'A4',printBackground: true})
		await browser.close()

		} catch (error) {
			console.log(error)
			throw new Error('Cannot create invoice HTML template.')
		}
})()