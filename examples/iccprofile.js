const { doDcm2Jpg } = require("../index");
const path = require("path");

( async () => {
    try {
        await doDcm2Jpg({
            dicomFile: path.join(__dirname, "./WSI.dcm"),
            jpgFile: path.join(__dirname, "./WSI-icc-profile.jpg"),
            frameNumber: 25,
            iccProfileName: "srgb"
        });
        console.log("convert DICOM to jpg successful");
        process.exit(0);
    } catch (e) {
        throw e;
    }
})();