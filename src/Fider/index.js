const Post = require('./Post')

class Fider {
	constructor(baseURL, API_KEY){
		this._baseURL = baseURL
		this._API_KEY = API_KEY
	}

	Post(id){
		return new Post(this._baseURL, this._API_KEY, id)
	}
}

module.exports = Fider