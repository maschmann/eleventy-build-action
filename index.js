const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const nodeVersion = core.getInput('node_version');
    const workingDir = core.getInput('working_directory') || '.';
    const output = core.getInput('output');
    const quiet = core.getInput('quiet') === 'true';

    core.startGroup('Setting up Node.js');
    await exec.exec('bash', ['-c', `nvm install ${nodeVersion}`]);
    core.endGroup();

    core.startGroup('Installing dependencies');
    await exec.exec('npm ci', [], { cwd: workingDir });
    core.endGroup();

    core.startGroup('Running Eleventy');
    let eleventyCommand = 'npx @11ty/eleventy';
    if (output) eleventyCommand += ` --output=${output}`;
    if (quiet) eleventyCommand += ' --quiet';

    await exec.exec(eleventyCommand, [], { cwd: workingDir });
    core.setOutput('build_status', 'success');
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();