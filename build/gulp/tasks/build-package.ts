'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {BuildConfig} from '../../../config/build';
import {Utils} from '../utils';
import * as yargs from 'yargs';
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
    
    // try this https://github.com/cthackers/adm-zip/wiki/ADM-ZIP-Introduction

    // return gulp.src(BuildConfig.NUGET_PACKAGE_CONTENTS, { base: '.' })
    //   .pipe($.if(this._args.verbose, $.print()))
    //   .pipe($.zip('nuget.zip'))
    //   .pipe(gulp.dest('dist'));
  }

}
