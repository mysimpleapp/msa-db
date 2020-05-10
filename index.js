require('./params.js')

const exp = module.exports = {
	installMsaModule: async itf => {
		await require("./install")(itf)
	}
}

const dbType = Msa.params.db.type
if (dbType === "sqlite") {
	const { withDb } = require('./sqlite')
	exp.withDb = withDb
} else {
	throw `Unsupported DB type: ${dbType}`
}