module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            "@Components": './src/Components',
            "@Screens": './src/Screens',
            "@Utils": './src/Utils',
            "@assets": './src/assets',
            "@theme": './src/theme',
            "@Routes": './src/Routes',
            "@Storage": './src/storage',
          }
        }
      ]
    ]
  };
};
