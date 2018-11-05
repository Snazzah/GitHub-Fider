const config = require('./Util/Config')

const Fider = require('./Fider')
const Formatter = require('./Util/Formatter')

const express = require('express')
const app = express()

const port = config.get('SERVER_PORT')

const fider = new Fider(config.get('FIDER_URL'), config.get('FIDER_API_KEY'))

const OPEN_ACTIONS = config.get('OPEN_ACTIONS').toLowerCase().split(',')
const MERGE_ACTIONS = config.get('MERGE_ACTIONS').toLowerCase().split(',')

const getPRData = body => ({
	userLogin: body.pull_request.user.login,
	userUrl: body.pull_request.user.login,
	title: body.pull_request.title,
	url: body.pull_request.html_url,
	number: body.pull_request.number,
	createdAt: body.pull_request.created_at,
	senderLogin: body.sender.login,
	senderUrl: body.sender.login,
})

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/github', async (req, res) => {
	res.send("OK")

	const body = req.body

	const ACTION_TYPE = body.action

	const PR_BODY = body.pull_request.body || ""

	const FIDER_DETAILS = PR_BODY.match(/(closes|completes|plans|starts)\s?fider:(\d+)/)

	const FIDER_ACTION = FIDER_DETAILS[1].toLowerCase()
	const FIDER_ID = FIDER_DETAILS[2]

	if (ACTION_TYPE === 'closed') {
		const post = fider.Post(FIDER_ID)

		if (FIDER_ACTION === 'plans' && MERGE_ACTIONS.indexOf('plans') > -1) {
			await post.plans(Formatter(config.get('PLAN_MESSAGE'), getPRData(body)))
		} else if (FIDER_ACTION === 'starts' && MERGE_ACTIONS.indexOf('starts') > -1) {
			await post.start(Formatter(config.get('START_MESSAGE'), getPRData(body)))
		} else if (
			(FIDER_ACTION === 'completes' || FIDER_ACTION === 'closes') &&
			(MERGE_ACTIONS.indexOf('completes') > -1 || OPEN_ACTIONS.indexOf('closes') > -1)
		) {
			await post.complete(Formatter(config.get('COMPLETE_MESSAGE'), getPRData(body)))
		}

	} else if (ACTION_TYPE === 'opened') {
		const post = fider.Post(FIDER_ID)

		if (FIDER_ACTION === 'plans' && OPEN_ACTIONS.indexOf('plans') > -1) {
			await post.plans(Formatter(config.get('PLAN_MESSAGE'), getPRData(body)))
		} else if (FIDER_ACTION === 'starts' && OPEN_ACTIONS.indexOf('starts') > -1) {
			await post.start(Formatter(config.get('START_MESSAGE'), getPRData(body)))
		} else if (
			(FIDER_ACTION === 'completes' || FIDER_ACTION === 'closes') &&
			(OPEN_ACTIONS.indexOf('completes') > -1 || OPEN_ACTIONS.indexOf('closes') > -1)
		) {
			await post.complete(Formatter(config.get('COMPLETE_MESSAGE'), getPRData(body)))
		}
	}
})

app.listen(port, () => console.log(`Listening on ${port}!`))
