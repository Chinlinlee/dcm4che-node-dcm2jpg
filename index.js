const { javaInstance, javaDcm2Jpg, javaFile } = require("./java-instance");
const lodash = require("lodash");

/**
 * @typedef Dcm2JpgOptions
 * @property {string} dicomFile
 * @property {string} jpgFile
 * @property {string} iccProfileName
 * @property {number} frameNumber
 * @property {number} jpgQuality
 * @property {number} windowCenter
 * @property {number} windowWidth
 */

/**
 *
 * @param {Dcm2JpgOptions} options
 */
async function doDcm2Jpg(options) {
    try {
        if (!options.dicomFile) {
            throw Error("missing DICOM filename");
        }

        let jpgFilename = lodash.get(
            options,
            "jpgFile",
            `${options.dicomFile}.jpg`
        );
        let frameNumber = lodash.get(options, "frameNumber", 1);
        let iccProfileName = lodash.get(options, "iccProfileName", "no");
        let jpgQuality = lodash.get(options, "jpgQuality", 1.0);

        let dicomFile = new javaFile(options.dicomFile);
        let jpgFile = new javaFile(jpgFilename);

        let javaDcm2JpgInstance = new javaDcm2Jpg();
        javaDcm2JpgInstance.setReadImageDicomInput();

        if (lodash.get(options, "windowCenter")) {
            await javaInstance.callMethodPromise(javaDcm2JpgInstance, "setWindowCenter", options.windowCenter);
        }

        if (lodash.get(options, "windowWidth")) {
            await javaInstance.callMethodPromise(javaDcm2JpgInstance, "setWindowWidth", options.windowWidth);
        }

        await javaInstance.callMethodPromise(
            javaDcm2JpgInstance,
            "setIccProfileFromString",
            iccProfileName
        );
        
        javaDcm2JpgInstance.setFrame(frameNumber);
        await javaInstance.callMethodPromise(
            javaDcm2JpgInstance,
            "initImageWriter",
            "JPEG",
            null,
            "com.sun.imageio.plugins.*",
            null,
            jpgQuality
        );
        await javaInstance.callMethodPromise(
            javaDcm2JpgInstance,
            "convert",
            dicomFile,
            jpgFile
        );
    } catch (e) {
        throw e;
    }
}

module.exports.doDcm2Jpg = doDcm2Jpg;
