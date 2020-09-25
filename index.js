require('./params.js')

const exp = {}

function initMod() {
	const dbType = Msa.params.db.type
	if (dbType === "sqlite") {
		const { withDb } = require('./sqlite')
		exp.withDb = withDb
	} else {
		throw `Unsupported DB type: ${dbType}`
	}
}

exp.installMsaModule = async itf => {
	await require("./install")(itf)
	initMod()
}
exp.startMsaModule = () => {
	initMod()
}

module.exports = exp