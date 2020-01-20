var exp = module.exports = new Msa.Module()

require('./params.js')

const dbType = Msa.params.db.type
if(dbType === "sqlite") {
	const { withDb } = require('./sqlite')
	exp.withDb = withDb
} else {
	throw `Unsupported DB type: ${dbType}`
}