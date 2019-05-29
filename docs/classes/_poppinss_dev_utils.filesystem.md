[@poppinss/dev-utils](../README.md) > [@poppinss/dev-utils](../modules/_poppinss_dev_utils.md) > [Filesystem](../classes/_poppinss_dev_utils.filesystem.md)

# Class: Filesystem

Filesystem class exposes a consistent API to create, read and delete files during tests. Apart from the generic CRUD operations, it has support for following.

1.  Ensures to clear the Node.js require cache if the created file is a module.
2.  Creating and loading `.env` file populates `process.env` object and this class will track those variables and removes them upon deletion of env file.

```
const fs = new Filesystem()

await fs.add('routes.js', `module.exports = 'routes'`)
await fs.remove('routes.js') // clears require cache

await fs.cleanup()
```

## Hierarchy

**Filesystem**

## Index

### Constructors

* [constructor](_poppinss_dev_utils.filesystem.md#constructor)

### Properties

* [basePath](_poppinss_dev_utils.filesystem.md#basepath)
* [fsExtra](_poppinss_dev_utils.filesystem.md#fsextra)

### Methods

* [add](_poppinss_dev_utils.filesystem.md#add)
* [cleanup](_poppinss_dev_utils.filesystem.md#cleanup)
* [ensureRoot](_poppinss_dev_utils.filesystem.md#ensureroot)
* [get](_poppinss_dev_utils.filesystem.md#get)
* [remove](_poppinss_dev_utils.filesystem.md#remove)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Filesystem**(basePath?: *`string`*): [Filesystem](_poppinss_dev_utils.filesystem.md)

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` basePath | `string` |  join(tmpdir(), &#x60;${new Date().getTime()}&#x60;) |

**Returns:** [Filesystem](_poppinss_dev_utils.filesystem.md)

___

## Properties

<a id="basepath"></a>

###  basePath

**● basePath**: *`string`*

___
<a id="fsextra"></a>

###  fsExtra

**● fsExtra**: *`"/Users/virk/code/poppinss/dev-utils/node_modules/@types/fs-extra/index"`* =  fsExtra

Reference to fsExtra

___

## Methods

<a id="add"></a>

###  add

▸ **add**(filePath: *`string`*, contents: *`string`*): `Promise`<`void`>

Add a new file with given contents

**Parameters:**

| Name | Type |
| ------ | ------ |
| filePath | `string` |
| contents | `string` |

**Returns:** `Promise`<`void`>

___
<a id="cleanup"></a>

###  cleanup

▸ **cleanup**(): `Promise`<`void`>

Cleanup all files and modules cache (if any)

**Returns:** `Promise`<`void`>

___
<a id="ensureroot"></a>

###  ensureRoot

▸ **ensureRoot**(): `Promise`<`void`>

Creates base path dir (if missing)

**Returns:** `Promise`<`void`>

___
<a id="get"></a>

###  get

▸ **get**(filePath: *`string`*): `Promise`<`string`>

Returns file contents

**Parameters:**

| Name | Type |
| ------ | ------ |
| filePath | `string` |

**Returns:** `Promise`<`string`>

___
<a id="remove"></a>

###  remove

▸ **remove**(filePath: *`string`*): `Promise`<`void`>

Remove file

**Parameters:**

| Name | Type |
| ------ | ------ |
| filePath | `string` |

**Returns:** `Promise`<`void`>

___

