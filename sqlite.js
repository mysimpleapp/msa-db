const exp = module.exports = {}

const path = require('path')
const { DbConnection } = require('./client')

const SqliteConnection = exp.SqliteConnection = class extends DbConnection {
    constructor(sqliteConn){
        super()
        this.sqliteConn = sqliteConn
    }
    getOne(query, args){
		if(Msa.params.log_level==="DEBUG") console.log(query)
        return new Promise((ok, ko) =>
            this.sqliteConn.get(this.translateSql(query), this.translateArgs(args), (err, row) => {
                if(err) ko(err)
                else ok(row)
            }))
    }
    get(query, args){
		if(Msa.params.log_level==="DEBUG") console.log(query)
        return new Promise((ok, ko) =>
            this.sqliteConn.all(this.translateSql(query), this.translateArgs(args), (err, rows) => {
                if(err) ko(err)
                else ok(rows)
            }))
    }
    run(query, args){
		if(Msa.params.log_level==="DEBUG") console.log(query)
        return new Promise((ok, ko) =>
            this.sqliteConn.run(this.translateSql(query), this.translateArgs(args), function(err){
                if(err) ko(err)
                else ok({ nbChanges: this.changes })
            }))
    }
    async transaction(next){
        await this.run("BEGIN TRANSACTION")
        try {
            await next()
            await this.run("COMMIT")
        } catch(err){
            await this.run("ROLLBACK")
            throw(err)
        }
    }
    splitSql(query){
        const words = []
        let curWord = ""
        for(let c of query){
            if(" (),=".indexOf(c) >= 0){
                if(curWord) words.push(curWord)
                curWord = ""
                words.push(c)
            } else {
                curWord += c
            }
        }
        if(curWord) words.push(curWord)
        return words
    }
    translateSql(query){
        const words = this.splitSql(query)
        for(let i in words){
            const w = words[i]
            if(w.startsWith(':'))
                words[i] = w.replace(':','$')
        }
        const res = words.join('')
        return res
    }
    translateArgs(args){
        if(typeof args === "object" && !isArr(args)){
            const res = {}
            for(const k in args)
                res["$"+k] = args[k]
            return res
        }
        return args
    }
}

const dbPath = path.resolve(Msa.dirname, Msa.params.db.path)
const sqlite3 = require("sqlite3")
const sqliteConn = new sqlite3.Database(dbPath)

exp.withDb = async function(next){
    await next(new SqliteConnection(sqliteConn))
}

// utils

const isArr = Array.isArray