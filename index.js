var msaDb = module.exports = new Msa.Module("db")

const path = require('path')

// params
require('./params.js')

// init sequelize ORM
const Sequelize = require('sequelize')
const dbType = Msa.params.db.type
var sequelize
if(dbType === "sqlite") {
	sequelize = new Sequelize('database', null, null, {
//		host: 'localhost',
		dialect: 'sqlite',
		pool: Msa.params.db.pool,
		storage: path.resolve(Msa.dirname, Msa.params.db.path)
		// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
//		operatorsAliases: false
	})
} else {
	throw `Unsupported DB type: ${dbType}`
}

// directories
// var sqliteDir = Msa.params.db.sqlite.dir


// API

msaDb.Orm = Sequelize
msaDb.orm = sequelize

// HTTP SERVICES ///////////////////////////////////////////
/*
// external dependencies (at the bottom of script to avoid cyclic dependency issue)
var msaUser = Msa.require("user")
var checkUserMdw = msaUser.checkUserMdw

msaNedb.app.getAsPartial('/', { wel: '/db/msa-db-browser.html' })

msaNedb.app.post('/',
//	checkUserMdw({ group:"admin" }),
	function(req, res, next) {
		var request = req.body.req
		var method = request.match(/\.[a-zA-Z]+/g)
		method = method[method.length-1].substring(1)
		var requestJs = "msaNedb."+request.replace(/\)$/,",dbCallback(req, res, next))").replace("(,","(")
		eval(requestJs)
})

var dbCallback = function(req, res, next) {
	return function(err, docs) {
		if(err) return next(err)
		res.json(docs)
	}
}
*/
// FILES /////////////////////////
//require("./files.js")

