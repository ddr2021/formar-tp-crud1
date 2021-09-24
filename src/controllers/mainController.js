const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		let id = products[0].id
		res.render('index', {
			id: id,
			products: products,
			toThousand: toThousand,
		}
		)
	},
	search: (req, res) => {
		// Do the magic
		// ALMACENAR LA BUSQUEDA DEL USUARIO
		let toSearch = req.query.keywords;
		// ALMACENAR RESULTADOS ENCONTRADOS EN ARRAY products
		let searchResults = [];
		// ITERAR LA BUSQUEDA HECHA SOBRE CADA INDICE DEL ARRAY products
		for (let i = 0; i < products.length; i++) {
			products[i].name.includes(toSearch) ? searchResults.push(products[i]) : 'Nada encontrado';
		}
		// res.send(idFind); // COMPROBAR
		res.render('results', {
			searchResults: searchResults,
			toThousand: toThousand,
		})

	},
};

module.exports = controller;
