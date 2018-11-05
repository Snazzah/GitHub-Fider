require('dotenv').config()

const init = function init() {};

const get = function get(key, defaultValue) {
	if (process.env[key] === undefined) {
		if (defaultValue) {
			return defaultValue
		}

		throw new Error('Env "' + key + '" not defined')
	}

	return process.env[key]
}

const isDev = function isDev() {
	if (!isDev.NODE_ENV) {
		isDev.NODE_ENV = get('NODE_ENV')
	}

	return isDev.NODE_ENV === 'development'
}

module.exports = {
	init,
	get,
	isDev,
}
