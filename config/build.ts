'use strict';

import * as yargs from 'yargs';

export class BuildConfig {
  public static ROOT: string = '.';
  public static NODE_MODULES: string = 'node_modules';
  public static BUILD_PATH: string = BuildConfig.ROOT + '/build';
  public static GULP_TASKS: string = BuildConfig.BUILD_PATH + '/gulp/tasks';

  // get version number
  public static VERSION: number = yargs.argv.version || require('./../package.json').version;

  // files & paths to include in nuget package
  public static NUGET_PACKAGE_CONTENTS: string[] = [
    'ng-office-ui-fabric.nuspec',
    '[Content_Types].xml',
    '_rels/.rels',
    'content/**/*',
    'package/**/*'
  ];
  // build library paths
  public static OUTPUT_PATH: string = BuildConfig.ROOT + '/dist';
  public static NUGET_PACKAGE_NAME: string = 'ng-office-ui-fabric.' + BuildConfig.VERSION + '.nupkg';

  /*
   * TypeScript files
   */
  public static TYPESCRIPT_DEFINITIONS: string = BuildConfig.BUILD_PATH + '/typings/**/*.d.ts';
  public static BUILD_TYPESCRIPT: string[] = [
    BuildConfig.BUILD_PATH + '/*.ts',
    BuildConfig.BUILD_PATH + '/gulp/**/*.ts',
    'gulpfile.ts'
  ];
}