const fetch = require('node-fetch')

class Post {
	constructor(baseURL, API_KEY, id){
		this._baseURL = baseURL
		this._API_KEY = API_KEY
		this._id = id
	}

	async _setStatus(status, comment, userID){

		const headers = {
			'Authorization': `Bearer ${this._API_KEY}`,
			'Content-Type': 'application/json',
		}

		if (userID) {
			headers['X-Fider-UserID'] = userID
		}

		console.log("headers", headers)

		return await fetch(`${this._baseURL}/api/v1/posts/${this._id}/status`, {
			method: 'PUT',
			body: JSON.stringify({
				status,
				text: comment,
			}),
			headers,
		}).then(res => res.json())
	}

	async plans(comment, userID){
		return await this._setStatus('planned', comment, userID)
	}

	async start(comment, userID){
		return await this._setStatus('started', comment, userID)
	}

	async complete(comment, userID){
		return await this._setStatus('completed', comment, userID)
	}
}

module.exports = Post
