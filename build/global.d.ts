/**
 * General purpose interface for callbacks that have no parameters or return types.
 * Commonly used in gulp tasks.
 *
 * @callback VoidCallback
 */
interface IVoidCallback {
  (): void;
}

/**
 * General purpose interface for callbacks that have a single string parameter or return types.
 * Commonly used in gulp tasks.
 *
 * @callback IStringCallback
 */
interface IStringCallback {
  (message?: string): void;
}

/**
 * Command line arguments.
 *
 * @typedef commandLineArgs
 * @type {Object}
 * @property {string=}  nugetApiKey - NuGet API Key used to upload a package.
 * @property {string=}  pkgPath - Fully qualified path to the NuGet package.
 * @property {boolean=}  verbose   - Flag if tasks should output verbose messages to console.
 */
interface ICommandLineArgs {
  nugetApiKey?: string;
  pkgPath?: string;
  verbose?: boolean;
}
