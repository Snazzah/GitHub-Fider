const fetch = require('node-fetch')

class Post {
	constructor(baseURL, API_KEY, id){
		this._baseURL = baseURL
		this._API_KEY = API_KEY
		this._id = id
	}

	async _setStatus(status, comment){
		return await fetch(`${this._baseURL}/api/v1/posts/${this._id}/status`, {
			method: 'PUT',
			body: JSON.stringify({
				status,
				text: comment,
			}),
			headers: {
				'Authorization': `Bearer ${this._API_KEY}`,
				'Content-Type': 'application/json',
			},
		}).then(res => res.json())
	}

	async plans(comment){
		return await this._setStatus('planned', comment)
	}

	async start(comment){
		return await this._setStatus('started', comment)
	}

	async complete(comment){
		return await this._setStatus('completed', comment)
	}
}

module.exports = Post
