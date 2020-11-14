require('./params.js')

module.exports = async itf => {
	await itf.questionParam({
		key: "db.type",
		question: "Which db type do you choose ?",
		defVal: "mongodb"
	})
	if(Msa.params.db.type === "mongodb"){
		await itf.questionParam({
			key: "db.host",
			question: "What is DB host ?",
			defVal: "localhost:27017"
		})
		await itf.install("mongodb", { dir:__dirname })
	} else if(Msa.params.db.type === "nedb"){
		await itf.questionParam({
			key: "db.path",
			question: "Choose DB path",
			defVal: "nedb"
		})
		await itf.install("nedb", { dir:__dirname })
	}else throw new Error(`Unsupported db type ${Msa.params.db.type}`)
}
