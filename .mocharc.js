module.exports = {
    require: ['@babel/register'],
    spec: 'tests/**/*.js',
    exclude: 'tests/example.spec.js',
    file: `setup/global-hooks.js`,
}
