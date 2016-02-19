'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {BuildConfig} from '../../../config/build';
import {Utils} from '../utils';
import * as yargs from 'yargs';
import * as archiver from 'archiver';
import * as fs from 'fs';
import * as path from 'path';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Builds the NuGet package
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Builds the NuGet package';

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
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

    let currentFolder: string = path.join(__dirname, '../../..');
    let nugetPackage: string = path.join(currentFolder,
                                         BuildConfig.OUTPUT_PATH,
                                         BuildConfig.NUGET_PACKAGE_NAME);

    // if dist doesn't exist, create it
    if (!fs.existsSync(path.join(currentFolder, BuildConfig.OUTPUT_PATH))) {
      fs.mkdirSync(path.join(currentFolder, BuildConfig.OUTPUT_PATH));
    }

    // create zip package
    let zip: any = archiver('zip');
    let output: fs.WriteStream = fs.createWriteStream(nugetPackage);
    zip.pipe(output);

    // add files to package
    BuildConfig.NUGET_PACKAGE_CONTENTS.forEach((file: string) => {
      let fileToAdd: string = path.join(currentFolder, file);
      zip.append(fileToAdd, {
        name: file
      });
    });

    // finalize & close out zip
    zip.finalize();

    done();
  }

}
