/*
 * @poppinss/dev-utils
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { tmpdir } from 'os'
import fsExtra from 'fs-extra'
import clearModule from 'clear-module'
import { join, extname, isAbsolute } from 'path'

/**
 * Filesystem class exposes a consistent API to create, read and delete
 * files during tests. Apart from the generic CRUD operations, it
 * also takes care of the remove the modules from Node.js cache.
 *
 * ```js
 * const fs = new Filesystem()
 *
 * await fs.add('routes.js', `module.exports = 'routes'`)
 * await fs.remove('routes.js') // clears require cache
 *
 * // do it after every test to cleanup all generated files
 * await fs.cleanup()
 * ```
 */
export class Filesystem {
	private modules: Set<string> = new Set()

	/**
	 * Reference to fsExtra
	 */
	public fsExtra = fsExtra

	constructor(public basePath = join(tmpdir(), `${new Date().getTime()}`)) {}

	/**
	 * Returns a boolean telling if file extension is part
	 * of a Node.js module
	 */
	private isModule(filePath: string): boolean {
		return ['.js', '.ts', '.json'].includes(extname(filePath))
	}

	/**
	 * Makes abs path to a given file
	 */
	private makePath(filePath: string): string {
		return isAbsolute(filePath) ? filePath : join(this.basePath, filePath)
	}

	/**
	 * Removes ext from the file path
	 */
	private dropExt(filePath: string): string {
		return filePath.replace(/\.\w+$/, '')
	}

	/**
	 * Removes the file path from nodejs module cache
	 */
	private removeFromModule(filePath: string): void {
		const absPath = this.makePath(filePath)
		this.modules.delete(absPath)

		/**
		 * Clear module raises error if file is not
		 * in require cache, we can safely ignore
		 * the error
		 */
		try {
			clearModule(absPath)
		} catch (error) {}
	}

	/**
	 * Store reference of a given file to clear it from the
	 * modules cache at a later stage
	 */
	private addToModule(filePath: string): void {
		if (!this.isModule(filePath)) {
			return
		}

		this.modules.add(this.makePath(filePath))
	}

	/**
	 * Add a new file with given contents
	 */
	public async add(filePath: string, contents: string): Promise<void> {
		const absPath = this.makePath(filePath)
		await this.fsExtra.outputFile(absPath, contents)

		this.addToModule(filePath)
	}

	/**
	 * Returns true when file exists on the disk
	 */
	public async exists(filePath: string): Promise<boolean> {
		return this.fsExtra.pathExists(this.makePath(filePath))
	}

	/**
	 * Creates base path dir (if missing)
	 */
	public async ensureRoot(): Promise<void> {
		return this.fsExtra.ensureDir(this.basePath)
	}

	/**
	 * Returns file contents
	 */
	public async get(filePath: string): Promise<string> {
		return this.fsExtra.readFile(this.makePath(filePath), 'utf-8')
	}

	/**
	 * Remove file
	 */
	public async remove(filePath: string): Promise<void> {
		const absPath = this.makePath(filePath)
		await this.fsExtra.remove(absPath)

		const withoutExt = this.dropExt(absPath)
		if (this.modules.has(absPath) || this.modules.has(withoutExt)) {
			this.removeFromModule(filePath)
			this.removeFromModule(withoutExt)
			return
		}
	}

	/**
	 * Cleanup all files and modules cache (if any)
	 */
	public async cleanup(): Promise<void> {
		await this.fsExtra.remove(this.basePath)
		this.modules.forEach((mod) => {
			this.removeFromModule(mod)
			this.removeFromModule(this.dropExt(mod))
		})
	}
}
