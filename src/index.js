const config = require('./Util/Config')

const Fider = require('./Fider')

const express = require('express')
const app = express()

const port = config.get('SERVER_PORT')

const fider = new Fider(config.get('FIDER_URL'), config.get('FIDER_API_KEY'))

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/github', async (req, res) => {
	res.send("OK")
	console.log("REQ", req.body)

	const body = req.body

	const ACTION_TYPE = body.action

	const PR_BODY = body.pull_request.body || ""

	const FIDER_DETAILS = PR_BODY.match(/(closes|completes|plans|starts)\s?fider:(\d+)/)

	const FIDER_ACTION = FIDER_DETAILS[1].toLowerCase()
	const FIDER_ID = FIDER_DETAILS[2]

	console.log("ACTION", ACTION_TYPE, "FIDER_DEETS", FIDER_DETAILS)

	console.log("FIDER_MORE", FIDER_ACTION, FIDER_ID)

	if (ACTION_TYPE === 'closed') {
		const post = fider.Post(FIDER_ID)

		let data

		if (FIDER_ACTION === 'plans') {
			data = await post.plans('Planned')
		} else if (FIDER_ACTION === 'starts') {
			data = await post.start('Started')
		} else if ( FIDER_ACTION === 'completes' || FIDER_ACTION === 'closes' ) {
			data = await post.complete('Completed.')
		}

		console.log("FIDER RESP", data)

	} else if (ACTION_TYPE === 'opened') {
		const post = fider.Post(FIDER_ID)

		let data

		if (FIDER_ACTION === 'plans') {
			data = await post.plans('Planned')
		} else if (FIDER_ACTION === 'starts') {
			data = await post.start('Started')
		} else if ( FIDER_ACTION === 'completes' || FIDER_ACTION === 'closes' ) {
			data = await post.complete('Completed.')
		}

		console.log("FIDER RESP", data)
	}
})

app.listen(port, () => console.log(`Listening on ${port}!`))
