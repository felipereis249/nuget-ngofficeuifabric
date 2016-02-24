'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
import * as yargs from 'yargs';
import * as http from 'http';
import * as request from 'request';
import * as fs from 'fs';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Upload the NuGet package to NuGet.org
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Upload the NuGet package to NuGet.org';

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'nugetApiKey': 'NuGet API key',
    'pkgPath': 'Fully qualified path to the NuGet package to upload',
    'verbose': 'Output all files added to NuGet package'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor(done: IVoidCallback) {
    super();
    Utils.log('Building NuGet package');

    // verify parameters
    let errorMessage: string = '';
    // verify nugetApiKey parameter specified
    if (!this._args.nugetApiKey || this._args.nugetApiKey === '') {
      errorMessage = 'Error: --nugetApiKey required';
    }
    // verify pkgPath parameter specified
    if (!this._args.pkgPath || this._args.pkgPath === '') {
      errorMessage = 'Error: --pkgPath required';
    } else if (!fs.existsSync(this._args.pkgPath)) {
      errorMessage = 'Error: specified package does not exist.';
    }
    if (errorMessage !== '') {
      Utils.log(errorMessage);
      Utils.handleError(<IGulpError>{
        __saftey: null,
        message: errorMessage,
        plugin: '',
        showProperties: false,
        showStack: false
      });
      done();
      return;
    }

    // read file into stream
    let nuGetPackageContent: fs.ReadStream = fs.createReadStream(this._args.pkgPath);
    let formData: any = {
      filename: 'package.nupkg',
      package: nuGetPackageContent
    };

    let options: request.CoreOptions = <request.CoreOptions>{
      formData: formData,
      headers: {
        'X-NuGet-ApiKey': this._args.nugetApiKey
      },
    };

    // create request
    request
      .put('https://www.nuget.org/api/v2/package',
           options,
           (error: any, response: http.IncomingMessage, body: any) => {
             console.log('error', error);
             console.log('response', response);
             console.log('body', body);
           });
    // https://www.npmjs.com/package/superagent
    /**
     * upload package payload
     * 
     * HTTP PUT
     * https://www.nuget.org/api/v2/package
     * X-NuGet-ApiKey: <API_KEY_FROM_NUGET>
     * CONTENT-TYPE: application/octet-stream
     * 
     * BODY: MultipartFormDataContent()
     * >>> content.add(file, name, fileName)
     * >>> these are not tied to actual file name
     * === content.add(streamOfFile, "package", "package.nupkg")
     */

    // TODO: handle response

    done();
  }

}

