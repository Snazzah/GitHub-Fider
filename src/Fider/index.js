const fetch = require('node-fetch')
const Post = require('./Post')

class Fider {
	constructor(baseURL, API_KEY){
		this._baseURL = baseURL
		this._API_KEY = API_KEY
	}

	Post(id){
		return new Post(this._baseURL, this._API_KEY, id)
	}

	async createUser(name, email, reference) {
		return await fetch(`${this._baseURL}/api/v1/users`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				email,
				reference,
			}),
			headers: {
				'Authorization': `Bearer ${this._API_KEY}`,
				'Content-Type': 'application/json',
			},
		}).then(res => {
			console.log("res", res)
			return res.json()
		})
	}
}

module.exports = Fider