const exp = module.exports = {}

exp.DbConnection = class {
    get(query, args){}
    getAll(query, args){}
    run(query, args){}
    transaction(next){}
    translateSql(query){}
}