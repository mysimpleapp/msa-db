const { join } = require('path')

Msa.registerParam({
	"db.type": {
		desc: "Database type",
		choices: [ "sqlite", "mysql", "postgre" ]
	},
	"db.path": {
		desc: "Path to DB file (sqlite only)",
	},
	"db.pool.min": {
		defVal: 0
	},
	"db.pool.max": {
		defVal: 5
	},
	"db.pool.acquire": {
		defVal: 10000
	},
	"db.pool.idle": {
		defVal: 30000
	},
})
