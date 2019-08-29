**[@poppinss/dev-utils](../README.md)**

[Globals](../README.md) › ["Filesystem"](../modules/_filesystem_.md) › [Filesystem](_filesystem_.filesystem.md)

# Class: Filesystem

Filesystem class exposes a consistent API to create, read and delete
files during tests. Apart from the generic CRUD operations, it
also takes care of the remove the modules from Node.js cache.

```js
const fs = new Filesystem()

await fs.add('routes.js', `module.exports = 'routes'`)
await fs.remove('routes.js') // clears require cache

// do it after every test to cleanup all generated files
await fs.cleanup()
```

## Hierarchy

* **Filesystem**

## Index

### Constructors

* [constructor](_filesystem_.filesystem.md#constructor)

### Properties

* [basePath](_filesystem_.filesystem.md#basepath)
* [fsExtra](_filesystem_.filesystem.md#fsextra)

### Methods

* [add](_filesystem_.filesystem.md#add)
* [cleanup](_filesystem_.filesystem.md#cleanup)
* [ensureRoot](_filesystem_.filesystem.md#ensureroot)
* [get](_filesystem_.filesystem.md#get)
* [remove](_filesystem_.filesystem.md#remove)

## Constructors

###  constructor

\+ **new Filesystem**(`basePath`: string): *[Filesystem](_filesystem_.filesystem.md)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`basePath` | string |  join(tmpdir(), `${new Date().getTime()}`) |

**Returns:** *[Filesystem](_filesystem_.filesystem.md)*

## Properties

###  basePath

• **basePath**: *string*

___

###  fsExtra

• **fsExtra**: *"/Users/virk/code/poppinss/dev-utils/node_modules/@types/fs-extra/index"* =  fsExtra

Reference to fsExtra

## Methods

###  add

▸ **add**(`filePath`: string, `contents`: string): *Promise‹void›*

Add a new file with given contents

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |
`contents` | string |

**Returns:** *Promise‹void›*

___

###  cleanup

▸ **cleanup**(): *Promise‹void›*

Cleanup all files and modules cache (if any)

**Returns:** *Promise‹void›*

___

###  ensureRoot

▸ **ensureRoot**(): *Promise‹void›*

Creates base path dir (if missing)

**Returns:** *Promise‹void›*

___

###  get

▸ **get**(`filePath`: string): *Promise‹string›*

Returns file contents

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *Promise‹string›*

___

###  remove

▸ **remove**(`filePath`: string): *Promise‹void›*

Remove file

**Parameters:**

Name | Type |
------ | ------ |
`filePath` | string |

**Returns:** *Promise‹void›*