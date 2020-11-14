require('./params.js')
const MongoClient = require('mongodb').MongoClient

const exp = {}

async function initMod() {
	exp.db = await new Promise((ok, ko) => {
		MongoClient.connect(`mongodb://${Msa.params.db.host}`, (err, client) => {
			if(err) ko(err)
			ok(client.db())
		})
	})
}

exp.installMsaModule = async itf => {
	await require("./install")(itf)
	await initMod()
}
exp.startMsaModule = async () => {
	await initMod()
}

module.exports = exp