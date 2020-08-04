/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Tests on config generation
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import configure from '#index';

jest.mock('#utilities', () => ({
  _esModule: true,
  buildJSONConfig: jest.fn(async (template: string) => template),
  buildListConfig: jest.fn(async (template: string) => template),
  loadYAMLTemplate: jest.fn(async () => ({ test: true })),
}));

describe('fn:configure', () => {
  it('export preset configuration', async () => {
    const expected = {
      links: {
        '.eslintrc.json': 'eslintrc',
        '.gitignore': 'gitignore',
        '.jestrc.json': 'jestrc',
        '.prettierrc.json': 'prettierrc',
        'tsconfig.json': 'tsconfig',
      },
      scripts: {
        test: true,
      },
    };

    expect(await configure()).toEqual(expected);
    expect(await configure({})).toEqual(expected);
  });
});
