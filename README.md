# Dev utils
> Collection of development utilities.

[![circleci-image]][circleci-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

A collection of utilities to make testing easier when developing packages. The package is written specially to cater the needs of the AdonisJS core team. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Available Utilities](#available-utilities)
- [Installation](#installation)
- [Filesystem](#filesystem)
  - [The problem](#the-problem)
  - [The solution](#the-solution)
- [API Docs](#api-docs)
- [Audit Report](#audit-report)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Available Utilities
- [FileSystem](#filesystem)

## Installation
Install the module from npm registry as follows:

```sh
npm i @poppinss/dev-utils

# yarn
yarn add @poppinss/dev-utils
```

## Filesystem
When writing tests, you may want to create some Javascript, or JSON files and then remove them after each test.

The process seems straight forward, until you realize that Node.js caches the script files and removing a file from the disk, doesn't removes it from Node.js cache.

### The problem

```js
test('do something', async () => {
	await fsExtra.outputFile('foo.js', `module.exports = 'foo'`)

	// test code

	await fsExtra.remove('foo.js')
})

test('do something different', async () => {
	await fsExtra.outputFile('foo.js', `module.exports = 'bar'`)
	
	require('foo.js') // returns 'foo' (because the file is cached)
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

## Audit Report
[Click here](https://htmlpreview.github.io/?https://github.com/poppinss/dev-utils/blob/develop/npm-audit.html) to see the latest npm audit report.

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/dev-utils/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/dev-utils "circleci"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/dev-utils.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/dev-utils "npm"

[license-image]: https://img.shields.io/npm/l/@poppinss/dev-utils?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
