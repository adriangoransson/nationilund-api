# Nation i Lund

Source code for the site [nationilund.se](https://nationilund.se).

Built with the [Gin Framework](https://gin-gonic.github.io/gin/), [Mithril](https://mithril.js.org/) and [Bootstrap](https://getbootstrap.com/).

Go 1.8 is required for dependency [adriangoransson/studentlund](https://github.com/adriangoransson/studentlund) to run.

Yarn is required to run the makefile, but npm should work just fine.

## Downloading
```sh
go get github.com/adriangoransson/nationilund
```


## Building frontend
[Yarn](https://yarnpkg.com/en/) is used for these instructions and in the Makefile. You can substitute with `npm` if you don't have yarn installed.

```sh
cd frontend-src
cp src/config.default.js src/config.js # Edit later if you wish
yarn install
```

Now that everything is installed. Use the npm/yarn scripts (defined in `package.json`) to build.

- `yarn run start` - Build the project with webpack in debug mode.
- `yarn run watch` - same as start, but recompiles automatically on code changes.
- `yarn run build` - Build with webpack production mode.

## Building backend
In project root:

```sh
go build        # Builds the project and creates a binary in the same folder
./nationilund   # Run
```

## Building in production mode
Easiest way is to just run `make`. This will create a folder `dist` with everything needed to run in it.

You'll find more specifically what `make` does in `Makefile`.
