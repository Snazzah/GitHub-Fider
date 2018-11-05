# GitHub-Fider
A GitHub pull request listener for interacting with Fider

## Using this

To use this, add a `.env` file to your base, set the `FIDER_URL` variable to your Fider base URL and the `SERVER_PORT` to the port to listen on.

Then, add a webhook to your github repo with the `Pull requests` scope.

To make it interact with Fider, you'll need to add a special syntax thing in your GitHub pull request as such: `<status> fider:<id>`, where `<id>` is the ID of the Fider post it relates to and `<status>` is one of the following:

| Status    | Fider Status |
|-----------|--------------|
| Plans     | planned      |
| Starts    | started      |
| Completes | completed    |
| Closes    | completed    |