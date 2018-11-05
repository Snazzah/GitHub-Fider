# GitHub-Fider
A GitHub pull request listener for interacting with Fider

## Using this

To use this, add a `.env` file to your base, and set the variables as follows:

| VARIABLE        | DESCRIPTION                                                       |
|-----------------|-------------------------------------------------------------------|
| FIDER_URL       | The URL of your Fider installation                                |
| FIDER_API_KEY   | Your Fider API Key                                                |
| SERVER_PORT     | The number for your server to listen on.                          |
| CLOSE_ON_CREATE | If fider posts should be completed when a pull request is opened. |

Then, add a webhook to your github repo with the `Pull requests` scope.

To make it interact with Fider, you'll need to add a special syntax thing in your GitHub pull request as such: `<status> fider:<id>`, where `<id>` is the ID of the Fider post it relates to and `<status>` is one of the following:

| Status    | Fider Status |
|-----------|--------------|
| Plans     | planned      |
| Starts    | started      |
| Completes | completed    |
| Closes    | completed    |