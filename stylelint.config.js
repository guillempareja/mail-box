module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  rules: {
    'prettier/prettier': true,
    'rule-empty-line-before': [
      'always',
      { except: ['first-nested'], ignore: ['after-comment'] },
    ],
    'length-zero-no-unit': true,
  },
};
