# Live Data

See the live docs at https://podcastindex-org.github.io/docs-api/

# Introduction

This project contains the files for describing the PodcastIndex.org API using the
[openapi](https://www.openapis.org/) syntax.

The `redocly/cli` Node package is used to compile the separate files in to a single master file.
This master file can be used in many [tools](https://openapi.tools/).

The [RapiDoc](https://mrin9.github.io/RapiDoc/) software is used to generate the document webpage.

# Installation

No items are installed globally. Run `yarn` to install the Node required packages.

NOTE: required yarn 2.x or newer. See https://yarnpkg.com/getting-started/install for install instructions.

# Available Scripts

In the project directory, you can run:

## `yarn preview`

Starts the redoc preview server.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## `yarn build`

Runs `bundle_json`, `bundle_yaml`

## `yarn bundle_json`

Generates the master openapi file `pi_api.json` in the `docs` folder.

The `pi_api.json` and `pi_api.yaml` contain the same content just shown in different formats.

## `yarn bundle_yaml`

Generates the master openapi file `pi_api.yaml` in the `docs` folder.

The `pi_api.json` and `pi_api.yaml` contain the same content just shown in different formats.

## `yarn lint`

Run the redoc linter on the source yaml files.

## `yarn reload`

Starts a LiveReload file watcher.

Install a compatible [browser extension](http://livereload.com/) and connect it to the livereload instance.

Pages connected to the file watcher will reload 2 seconds after the file changes. The 2 second delay gives the
openapi preview script time to generate the new api files.

## `yarn server`

Create a simple server in the `docs` folder to serve the release files.

# Folder Structure

## `api_src`

This folder contains the source yaml files for describing the API. The root file is `root.yaml`.

See the [openapi Specification](https://www.openapis.org/) for details on the format. Additional specification details
from [Swagger](https://swagger.io/specification/) and
[OpenAPI GitHub](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/).

THe remaining folders follow the structure suggested by
[create-openapi-repo](https://github.com/Redocly/create-openapi-repo).

### `paths`

The folder structure should follow the paths in the API requests where the file is the last value in the request URL
path.

See additional suggestions for the structure from redoc in the
[create-openapi-repo project](https://github.com/Redocly/create-openapi-repo/blob/master/template/openapi/paths/README.md).

### `components`

In general, a folder exists for each object type in the API yaml document. A block that is used in many files should
have a separate yaml file created and be referenced from the files where it is used.

- `callbacks` - reusable [Callback Objects](http://spec.openapis.org/oas/v3.1.0#callback-object)
- `examples` - reusable [Example Objects](http://spec.openapis.org/oas/v3.1.0#example-object)
- `headers` - reusable [Header Objects](http://spec.openapis.org/oas/v3.1.0#header-object)
- `links` - reusable [Link Objects](http://spec.openapis.org/oas/v3.1.0#link-object)
- `parameters` - reusable [Parameter Objects](http://spec.openapis.org/oas/v3.1.0#parameter-object)
- `requestBodies` - reusable [Request Body Objects](http://spec.openapis.org/oas/v3.1.0#request-body-object)
- `responses` - reusable [Response Objects](http://spec.openapis.org/oas/v3.1.0#responses-object)
- `schemas` - reusable [Schema Objects](http://spec.openapis.org/oas/v3.1.0#schema-object)
- `securitySchemes` - reusable [Security Scheme Objects](http://spec.openapis.org/oas/v3.1.0#security-scheme-object)

## `docs`

Source directory for site source files. This folder should be deployed to the server.

The master api files and images are in the root directory.
The root `index.html` uses the [RapiDoc](https://mrin9.github.io/RapiDoc/) UI.

The `template.html` file is the necessary template file for the [redoc](https://redoc.ly/redoc/) preview generated with
`yarn preview` is also in this folder.
