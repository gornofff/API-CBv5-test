module.exports = {
    require: ['@babel/register'],
    spec: 'tests/**/*.js',
    exclude: 'tests/example.spec.js',
    file: `setup/global-hooks.js`,
    timeout: 20000,
    reporter: 'mochawesome',
    reporterOptions: ['json=false', 'reportFilename=MyReport', 'reportDir=Reports']

}
