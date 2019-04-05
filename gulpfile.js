const {exec} = require('child_process');
const {series} = require('gulp');

function runCommand(command)
{
    const process = exec(command);

    process.stdout.on('data', data =>
    {
        console.log(data);
    });

    process.stderr.on('data', data =>
    {
        console.error(data);
    });

    return process;
}

function ngBuildProd()
{
    return runCommand('ng build --prod');
}

function runTests()
{
    return runCommand('npm run test-headless');
}

exports.default = series(ngBuildProd, runTests);
