import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Destructure from CommonJS default exports
const { configs: tsConfigs } = tseslintPlugin;
const { configs: angularConfigs } = angularPlugin;
const { configs: templateConfigs } = angularTemplatePlugin;

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.angular/**',
      'coverage/**',
      '**/*.spec.ts',
      'karma.conf.js',
    ],
  },
  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.app.json',
        createDefaultProgram: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsConfigs.recommended.rules,
      ...angularConfigs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  // HTML templates
  {
    files: ['**/*.html'],
    ignores: ['src/index.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...templateConfigs.recommended.rules,
      ...templateConfigs.accessibility.rules,
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
    },
  },
];
