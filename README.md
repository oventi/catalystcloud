# catalystcloud

**Highly experimental**. Attempts to emulate AWS's CLI for [Catalyst Cloud](https://catalystcloud.nz/) and can also be called as a module in Node.js code.

**IMPORTANT**: Catalyst Cloud containers cannot have and `_` in the name.

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

### Running it on the CLI

```sh
yarn run catalystcloud <command + parameters>
```

Example

```sh
# Catalyst Cloud containers cannot have and _ in the name.

CONTAINER=https://object-storage.nz-hlz-1.catalystcloud.io/kia-ora
yarn run catalystcloud containers empty     --container $CONTAINER
yarn run catalystcloud containers put_files --container $CONTAINER --folder ./dist
```

### Using it as a module in Node.js code

```js
import {catalystcloud_containers} from 'catalystcloud'

const container = catalystcloud_containers({
  container: 'https://object-storage.nz-hlz-1.catalystcloud.io/kia-ora'
})

;(async () => { // async function needed
  await container.empty()
  await container.put_files({folder: './dist'})
})()
```

## Commands available

```sh
yarn run catalystcloud containers empty     --container [url]
yarn run catalystcloud containers put_file  --container [url] --file [file path]
yarn run catalystcloud containers put_files --container [url] --folder [folder path]
```

```js
import {catalystcloud_containers} from 'catalystcloud'

const container = catalystcloud_containers({container: '[url]'})

;(async () => {
  await container.empty()
  await container.put_file({file: '[file path]'})
  await container.put_files({folder: '[folder path]'})
})()
```

## License

Copyright (c) 2022 [Andrés Proaño Valencia](https://oventi.org)

Licensed under the GPL v3 license.
