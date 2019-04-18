# Nation i Lund, API

Source code for the api that backs [nationilund.se](https://nationilund.se).

Built with the [Gin Framework](https://gin-gonic.github.io/gin/).

Go 1.8 is required for dependency [adriangoransson/studentlund](https://github.com/adriangoransson/studentlund) to run.

## Build and run
In project root:

```sh
go build          # Builds the project and creates a binary in the same folder
./nationilund-api # Runs on port 8080 or env $PORT
```

Deployed with [Apex up](https://github.com/apex/up). Configuration in [up.json](up.json).

**Reminder to self about up**: Never delete the stack unless necessary. Update up.json and run stack plan/apply.
If the stack is deleted, reroute dns entries pointing to cloudfront or the custom domain won't work.
Actually, just remove the custom domain completely, deploy and then re-add and run stack plan/apply.
