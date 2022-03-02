# catalystcloud

**Highly experimental**. Attempts to emulate AWS's CLI for [Catalyst Cloud](https://catalystcloud.nz/).

## Installation

This module can be installed in your project using [NPM] or [Yarn]. [Node.js] 14+ required.

```sh
npm i https://github.com/oventi/catalystcloud --save
```

```sh
yarn add https://github.com/oventi/catalystcloud
```

## Usage

### Environment variables

The following variables are needed. They can be found at the [API Access](https://dashboard.cloud.catalyst.net.nz/project/api_access/) section.

- CATALYSTCLOUD_REGION
- CATALYSTCLOUD_ACCESS_KEY_ID
- CATALYSTCLOUD_SECRET_ACCESS_KEY

### Calling a command

```sh
yarn run catalystcloud <command + parameters>
```

Or if you add a shortcut in your `package.json`

```
"scripts": {
  "cc": "catalystcloud"
}
```

```sh
yarn cc <command + parameters>
```

Example

```sh
yarn run catalystcloud containers --container [url] --empty
```

## Commands

- containers
- `--empty`
- `--put-file [file path]`
- `--put-files [folder path]`

Assuming there is a script in package.json to create shortcut `cc`:

```sh
yarn cc containers --container [url] --empty
yarn cc containers --container [url] --put-file ~/dist/index.html
yarn cc containers --container [url] --put-files ~/dist
```

## License

Copyright (c) 2022 [Andrés Proaño Valencia](https://oventi.org)

Licensed under the GPL v3 license.
