# GitHub-Fider
A GitHub pull request listener for interacting with Fider

## Using this

### Env file

To use this, add a `.env` file to your base, and set the variables as follows:

| VARIABLE         | DESCRIPTION                                                                                |
|------------------|--------------------------------------------------------------------------------------------|
| FIDER_URL        | The URL of your Fider installation                                                         |
| FIDER_API_KEY    | Your Fider API Key                                                                         |
| SERVER_PORT      | The number for your server to listen on.                                                   |
| OPEN_ACTIONS     | A comma (`,`) separated list of the statuses that can be set when a pull request is opened |
| MERGE_ACTIONS    | A comma (`,`) separated list of the statuses that can be set when a pull request is merged |
| PLAN_MESSAGE     | The message to send when the status of the Fider post is set to `Planned`                  |
| COMPLETE_MESSAGE | The message to send when the status of the Fider post is set to `Completed`                |
| START_MESSAGE    | The message to send when the status of the Fider post is set to `Started`                  |

### Webhook

Add a webhook to your GitHub repo with the `Pull requests` scope by going to your repo settings, clicking `Webhooks` and clicking the `Add webhook` button.

Set the `Payload URL` to the URL of where you're running the webhook consumer, adding the `/github` endpoint at the end.

For example, if you're running this on `https://example.com`, you need to set it to `https://example.com/github`.

Next up, set the `Content type` to `application/json`.

Then, in the `Which events would you like to trigger this webhook?` section, click `Let me select individual events.` and find the checkbox labeled `Pull requests` and select it, and deselect everything else.

### Pull requests

In order for this project to interact with your Fider instance, you'll need to add a `<status> fider:<id>` in your pull request, similar to the [GitHub keywords](https://help.github.com/articles/closing-issues-using-keywords/), where the `<id>` is the ID of the Fider post you're working on. For example, `https://ideas.example.com/posts/101/example-post` would have the ID `101`.

Currently, only a certain amount of statuses are supported, and you can find those below.

#### Statuses

| Status    | Fider Status |
|-----------|--------------|
| Plans     | planned      |
| Starts    | started      |
| Completes | completed    |
| Closes    | completed    |

### Response messages

Fider allows contributors and administrators to set a message to follow along the status of the post responses.

From this application, these can be set in the `.env` file and support the following variables by putting them in curly brackets (`{variable}`):

| VARIABLE    | VALUE                                                         |
|-------------|---------------------------------------------------------------|
| userLogin   | The username of the user that created the pull request        |
| userUrl     | The profile URL of the user that created the pull request     |
| title       | The title of the pull request                                 |
| number      | The pull request number                                       |
| url         | The URL of the pull request                                   |
| createdAt   | The timestamp of when the pull request was created            |
| senderLogin | The username of the user that triggered the webhook request   |
| senderUrl   | The profileURL of the user that triggered the webhook request |
