<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Dev utils
> Collection of development utilities.

[![circleci-image]][circleci-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

This module exposes a collection of utilities that can be used during tests for easy development.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Installation](#installation)
- [Filesystem](#filesystem)
  - [The problem](#the-problem)
  - [The solution](#the-solution)
- [API Docs](#api-docs)
- [Maintainers](#maintainers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
Install the module from npm registry as follows:

```sh
npm i @poppinss/dev-utils

# yarn
yarn add @poppinss/dev-utils
```

## Filesystem
When writing tests, you may want to create some Javascript, or JSON files and then remove them after each test.

The process seems straight forward, until you realize that Node.js caches the script files and remove a file from the disk, doesn't removes it from Node.js cache.

### The problem

```js
test('do something', async () => {
  await fsExtra.outputFile('foo.js', `module.exports = 'foo'`)

  // test code

  await fsExtra.remove('foo.js')
})

test('do something different', async () => {
  await fsExtra.outputFile('foo.js', `module.exports = 'bar'`)
  
  require('foo.js') // returns 'foo' (coz the file is cached)
})
```

### The solution
The `Filesystem` class exported by this module takes care of removing the module from the cache, when you remove it from the disk. It does this for `.js`, `.ts` and `.json` files.

```ts
import { join } from 'path'
import { Filesystem } from '@poppinss/dev-utils'
const fs = new Filesystem()

test.group((group) => {
  group.afterEach(async () => {
    await fs.cleanup()
  })

  test('do something', async () => {
    await fs.add('foo.js', `module.exports = 'foo'`)
    require(join(fs.basePath, 'foo.js')) // 'foo'
  })

  test('do something', async () => {
    await fs.add('foo.js', `module.exports = 'bar'`)
    require(join(fs.basePath, 'foo.js')) // 'bar'
  })
})
```

The `fs.cleanup` method removes all the files created via `fs.add` and also removes the modules from the cache.

## API Docs
The API docs are generated using Typedoc.

* [API](docs/README.md)

## Maintainers
[Harminder virk](https://github.com/thetutlage)

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/dev-utils/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/dev-utils "circleci"

[npm-image]: https://img.shields.io/npm/v/@poppinss/dev-utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/dev-utils "npm"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript

[license-url]: LICENSE.md
[license-image]: https://img.shields.io/aur/license/pac.svg?style=for-the-badge
