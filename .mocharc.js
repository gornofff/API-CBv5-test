module.exports = {
    require: ['@babel/register'],
    spec: 'tests/**/*.js',
    exclude: 'tests/example.spec.js',
    file: `setup/global-hooks.js`,
    reporter: 'mochawesome',
    'reporter-options': 'json=false,reportFilename=MyReport,reportDir=Reports'

}
