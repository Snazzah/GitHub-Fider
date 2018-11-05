String.prototype.formatUnicorn = String.prototype.formatUnicorn || function () {
	let str = this.toString();
	if (arguments.length) {
		let t = typeof arguments[0]
		let key
		let args = t === "string" || t === "number" ?
			Array.prototype.slice.call(arguments)
			: arguments[0]

		for (key in args) {
			str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key])
		}
	}

	return str
}

module.exports = (str, data) => {
	return str.formatUnicorn(data)
}