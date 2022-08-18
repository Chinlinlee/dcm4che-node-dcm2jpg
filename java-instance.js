const java = require('java');
const glob = require("glob");
const path = require("path");

java.asyncOptions = {
    asyncSuffix: "",
    syncSuffix: "Sync",
    ifReadOnlySuffix: "_alt"
};

let jarFiles = glob.sync("**/*.jar", {
    cwd: path.join(__dirname, "./javaNode"),
    absolute: true
});
for(let i = 0 ; i < jarFiles.length ; i++) {
    let jarFile = path.normalize(jarFiles[i]);
    java.classpath.push(jarFile);
}

java.classpath.push(path.join(__dirname, "./javaNode/dcm2jpg/src/main/java"));

java.callMethodPromise =  (instance, methodName, ...args) => {
    return new Promise( (resolve, reject) => {
        java.callMethod(instance, methodName, ...args, function (err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
    
};

module.exports.javaInstance = java;
module.exports.javaDcm2Jpg = java.import("org.github.chinlinlee.dcm2jpg.Dcm2Jpg");
module.exports.javaFile = java.import("java.io.File");