const { doDcm2Jpg } = require("../index");
const path = require("path");

( async () => {
    try {
        await doDcm2Jpg({
            dicomFile: path.join(__dirname, "./1-1.dcm"),
            windowCenter: 309,
            windowWidth: 561
        });
        console.log("convert DICOM to jpg successful");
        process.exit(0);
    } catch (e) {
        throw e;
    }
})();