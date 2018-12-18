const { join } = require('path')

new Msa.ParamDef("db.type", {
	desc: "Database type",
	choices: [ "sqlite", "mysql", "postgre" ]
})
new Msa.ParamDef("db.path", {
	desc: "Path to DB file (sqlite only)"
})
new Msa.ParamDef("db.pool.min", {
	defVal: 0
})
new Msa.ParamDef("db.pool.max", {
	defVal: 5
})
new Msa.ParamDef("db.pool.acquire", {
	defVal: 10000
})
new Msa.ParamDef("db.pool.idle", {
	defVal: 30000
})
