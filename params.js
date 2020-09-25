new Msa.Param("db.type", {
	desc: "Database type",
	choices: ["sqlite", "mysql", "postgre"]
})
new Msa.Param("db.path", {
	desc: "Path to DB file (sqlite only)"
})
new Msa.Param("db.pool.min", {
	defVal: 0
})
new Msa.Param("db.pool.max", {
	defVal: 5
})
new Msa.Param("db.pool.acquire", {
	defVal: 10000
})
new Msa.Param("db.pool.idle", {
	defVal: 30000
})
