const { ESLint } = require('eslint');

// @see https://github.com/okonet/lint-staged#how-can-i-ignore-files-from-eslintignore
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file);
    }),
  );
  const filteredFiles = files.filter((_, i) => !isIgnored[i]);
  return filteredFiles.join(' ');
};

module.exports = {
  '**/*.{js,jsx,ts,tsx,json,md,yml,yaml}': async (files) => {
    return [`prettier --check ${files.join(' ')}`];
  },
  '**/*.{ts,tsx,js,jsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [`eslint --max-warnings=0 ${filesToLint}`];
  },
};
