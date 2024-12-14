/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 927:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 421:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(927);
const exec = __nccwpck_require__(421);

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
module.exports = __webpack_exports__;
/******/ })()
;