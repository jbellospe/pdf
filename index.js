const Fs = require('fs')  
const Path = require('path')  
const Util = require('util')  
const Puppeteer = require('puppeteer')  
const Handlebars = require('handlebars')  
const { readFileSync } = require('fs');
const ReadFile = Util.promisify(Fs.readFile);
const QRCode = require('qrcode');

(async () => {
    try {
		
		var generateqr = await QRCode.toDataURL('https://guaostudio.com/');
		 
		const data = {
			name: 'Name Name Name',
			afiliar:`data:image/jpeg;base64,${readFileSync('./assets/cajasa.png').toString('base64')}`, 
			data: `data:image/jpeg;base64,${readFileSync('./assets/internacional.png').toString('base64')}`,
			qr:`${generateqr}`,
			truck:`data:image/jpeg;base64,${readFileSync('./assets/truck.png').toString('base64')}`,
			folio: '29012AAA',
			fecha: '13-AGOSTO-2021',
			nombre: 'Jorge Luis Bello Spezzia',
			telefono: '2222222222',
			email:'jbello@guaodev.com',
			especificaciones:{
				MOTOR:'DIESEL {CUMMINS ISX 450 L} EURO V, SCR, 450HP @ 1800',
				TORQUE:'RPM LB-FT TORQUE @ 1000 RPM, 2000',
				TRANSMISION:'Eaton Fuller UltraShift + FO-18E318B - MXP 18 V'
				
			},
			carroceria:{
				MARCA: 'AMHER',
				TIPO: 'CAJA SECA',
				DESCRIPCIÓN: 'PAREDES AISLADAS DE TRES PULGADAS'
			},
			opciones:[
				{
					key:'KIT AERODINÁMICO',
					costo: '$200,000.°°'
				},
				{
					key:'SISTEMA DE SEGURIDAD',
					costo: '$200,000.°°'
				},

			],
			preciototal:'$2´319,965.°°'
		}
		const templatePath = Path.resolve('formato.html')
		const content = await ReadFile(templatePath, 'utf8')
		const template = Handlebars.compile(content)
		const html = template(data)
		const browser = await Puppeteer.launch()
		const page = await browser.newPage()
		await page.setContent(html,{waitUntil: 'networkidle2'})
		await page.pdf({path: 'haiwi.pdf', format: 'A4',printBackground: true})
		await browser.close()
		} catch (error) {
			console.log(error)
			throw new Error('Cannot create invoice HTML template.')
		}
})()