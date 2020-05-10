require('./params.js')

module.exports = async itf => {
	await itf.questionParam({
		key: "db.type",
		question: "Which db type do you choose ?",
		defVal: "sqlite"
	})
	if(Msa.params.db.type === "sqlite"){
		await itf.questionParam({
			key: "db.path",
			question: "Choose path to DB file",
			defVal: "db.sqlite"
		})
		await itf.install("sqlite3", { dir:__dirname })
	}
}
