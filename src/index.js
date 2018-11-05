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

	const body = req.body

	const ACTION_TYPE = body.action

	const PR_BODY = body.pull_request.body || ""

	const FIDER_DETAILS = PR_BODY.match(/(closes|completes|plans|starts)\s?fider:(\d+)/)

	const FIDER_ACTION = FIDER_DETAILS[1].toLowerCase()
	const FIDER_ID = FIDER_DETAILS[2]

	if (ACTION_TYPE === 'closed') {
		const post = fider.Post(FIDER_ID)

		if (FIDER_ACTION === 'plans') {
			await post.plans(`Planned - ${body.user.login}`)
		} else if (FIDER_ACTION === 'starts') {
			await post.start(`Started - ${body.user.login}`)
		} else if ( FIDER_ACTION === 'completes' || FIDER_ACTION === 'closes' ) {
			await post.complete(`Completed - ${body.user.login}`)
		}

	} else if (ACTION_TYPE === 'opened') {
		const post = fider.Post(FIDER_ID)

		if (FIDER_ACTION === 'plans') {
			await post.plans(`Planned - ${body.user.login}`)
		} else if (FIDER_ACTION === 'starts') {
			await post.start(`Started - ${body.user.login}`)
		} else if ( FIDER_ACTION === 'completes' || FIDER_ACTION === 'closes' ) {
			if(config.get('CLOSE_ON_CREATE')){
				await post.complete(`Completed - ${body.user.login}`)
			}
		}
	}
})

app.listen(port, () => console.log(`Listening on ${port}!`))
