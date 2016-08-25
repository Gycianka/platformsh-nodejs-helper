'use strict';

/**
 * Reads Platform.sh configuration from environment and returns a single object
 * Usage: 
 *   # put in package.json in the dependencies
 *      "platformsh": "^0.0.3"
 *   # and in your code
 *   var config= require("platformsh").config();
 */
module.exports = {
    config: function() {
        if (process.env.PLATFORM_PROJECT != undefined) {
            var conf = {};
            conf.application = read_base64_json('PLATFORM_APPLICATION');
            conf.relationships = read_base64_json('PLATFORM_RELATIONSHIPS');
            conf.variables = read_base64_json('PLATFORM_VARIABLES');
            conf.application_name = process.env.PLATFORM_APPLICATION_NAME || null;
            conf.app_dir = process.env.PLATFORM_APP_DIR || null;
            conf.environment = process.env.PLATFORM_ENVIRONMENT || null;
            conf.project = process.env.PLATFORM_PROJECT || null;
            conf.port = process.env.PORT || null;
            conf.omp_num_threads = num_of_cpus();
        } else {
            console.log("This is not running on platform.sh");
            return null;
        }
        return conf;
    }
};

/**
* Read number of CPUs from environment or fallback to the _private_ configuration property
* Useful for determining the number of processes to fork.
*/
function num_of_cpus() {
    try {
        var config = _read_app_config();
        process.env['OMP_NUM_THREADS '] = process.env['OMP_NUM_THREADS '] || Math.ceil(config.info.limits.cpu);
        return process.env['OMP_NUM_THREADS '];
    } catch (err) {
        console.log("Could not get number of cpus");
        return null;
    }
}


function read_base64_json(var_name) {
    try {
        return JSON.parse(new Buffer(process.env[var_name], 'base64').toString());
    } catch (err) {
        console.log("no " + var_name + " environment variable");
        return null;
    }
}

/**
*This is private and subject to change. Do not trust this file exists, or has any specific format
*/
function _read_app_config() {
    var config = require('/run/config.json');
    return config;
}
