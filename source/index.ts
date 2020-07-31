/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import {
  buildJSONConfig,
  buildListConfig,
  loadYAMLTemplate,
} from './utilities';

/** config for this preset */
interface PresetConfig {
  /** configuration to be merged with .eslintrc */
  eslint?: Record<string, unknown>;
  /** configuration to be merged with .jestrc */
  jest?: Record<string, unknown>;
  /** patterns to be added to .gitignore */
  gitignore?: string[];
  /** configuration to be merged with .presetterrc */
  prettier?: Record<string, unknown>;
  /** configuration to be merged with tsconfig.json */
  tsconfig?: Record<string, unknown>;
  /** relative path to root directories for different file types */
  directory?: {
    /** the directory containing the whole repository (default: .) */
    root?: string;
    /** the directory containing all typing files (default: types) */
    types?: string;
    /** the directory containing all test files (default: spec) */
    test?: string;
  };
}

/** detail of linked configuration files and script templates  */
interface Preset {
  /** paths to the generated configuration files */
  links: Record<string, string>;
  /** npm script template */
  scripts: Record<string, string>;
}

/**
 * get a list of presets
 * @param config options for the configurator
 * @param config.mode export mode
 * @returns preset list
 */
export default async function (config?: PresetConfig): Promise<Preset> {
  const parameter = {
    root: '.',
    types: 'types',
    test: 'spec',
    ...config?.directory,
  };

  const json = async (
    name: string,
    extra: Record<string, unknown> = {},
  ): Promise<string> => buildJSONConfig(name, { extra, parameter });

  const list = async (name: string, extra: string[] = []): Promise<string> =>
    buildListConfig(name, { extra, parameter });

  return {
    links: {
      '.eslintrc.json': await json('eslintrc', config?.eslint),
      '.jestrc.json': await json('jestrc', config?.jest),
      '.gitignore': await list('gitignore', config?.gitignore),
      '.prettierrc.json': await json('prettierrc', config?.prettier),
      'tsconfig.json': await json('tsconfig', config?.tsconfig),
    },
    scripts: await loadYAMLTemplate<string>('scripts', parameter),
  };
}
