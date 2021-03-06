/*
 * @poppinss/dev-utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { join } from 'path'
import { pathExists, remove } from 'fs-extra'
import { Filesystem } from '../src/Filesystem'

test.group('Filesystem', () => {
  test('add new file to the disk', async (assert) => {
    const fs = new Filesystem(join(__dirname, 'app'))
    await fs.add('hello.txt', 'Hello world')

    const exists = await pathExists(join(fs.basePath, 'hello.txt'))
    assert.isTrue(exists)

    await remove(fs.basePath)
  })

  test('adding js file should populate modules set', async (assert) => {
    const fs = new Filesystem(join(__dirname, 'app'))
    await fs.add('hello.js', "module.exports = 'Hello world'")

    const exists = await pathExists(join(fs.basePath, 'hello.js'))

    assert.isTrue(exists)
    assert.deepEqual(Array.from(fs['modules'].values()), [join(fs.basePath, 'hello.js')])

    await remove(fs.basePath)
  })

  test('removing js file should clear it from node require cache', async (assert) => {
    const fs = new Filesystem(join(__dirname, 'app'))

    await fs.add('config/foo.js', "module.exports = 'Hello world'")
    assert.equal(require('./app/config/foo.js'), 'Hello world')

    /**
     * Should clean it from cache too
     */
    await fs.remove('config/foo.js')

    await fs.add('config/foo.js', "module.exports = 'Hi world'")
    assert.equal(require('./app/config/foo.js'), 'Hi world')

    await fs.cleanup()
  })

  test('clean module from require cache, when required without extension', async (assert) => {
    const fs = new Filesystem(join(__dirname, 'app'))

    await fs.add('foo.js', "module.exports = 'Hello world'")
    assert.equal(require('./app/foo'), 'Hello world')

    /**
     * Should clean it from cache too
     */
    await fs.remove('foo.js')

    await fs.add('foo.js', "module.exports = 'Hi world'")
    assert.equal(require('./app/foo'), 'Hi world')

    await fs.cleanup()
  })

  test('cleanup all files from system basePath', async (assert) => {
    assert.plan(3)
    const fs = new Filesystem(join(__dirname, 'app'))

    await fs.add('hello.js', "module.exports = 'Hello world'")
    await fs.cleanup()

    const exists = await pathExists(fs.basePath)

    assert.isFalse(exists)
    assert.isUndefined(process.env.PORT, '3333')

    try {
      require(join(fs.basePath, 'hello.js'))
    } catch (error) {
      assert.equal(error.code, 'MODULE_NOT_FOUND')
    }

    await fs.cleanup()
  })

  test('create base path directory if missing', async (assert) => {
    const fs = new Filesystem(join(__dirname, 'app'))
    await fs.ensureRoot()

    const exists = await pathExists(fs.basePath)
    assert.isTrue(exists)

    await fs.cleanup()
  })

  test('find if file exists', async (assert) => {
    const fs = new Filesystem(join(__dirname, 'app'))
    await fs.add('hello.txt', 'Hello world')

    const exists = await fs.exists('hello.txt')
    assert.isTrue(exists)

    await fs.cleanup()
  })
})
