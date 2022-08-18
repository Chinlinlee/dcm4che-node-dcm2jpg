package org.github.chinlinlee.dcm2jpg;

import java.io.File;

public class Dcm2JpgExecutor {
    public static class ConvertStatus {
        public Boolean status;
        public String message;
    }
    public static ConvertStatus convertDcmToJpgFromFilename(String dcmFilename, String jpgFilename) {
        ConvertStatus status = new ConvertStatus();
        try {
            Dcm2Jpg dcm2Jpg = new Dcm2Jpg();
            dcm2Jpg.initImageWriter("JPEG", null, "com.sun.imageio.plugins.*", null, 1.0);
            dcm2Jpg.setReadImage(dcm2Jpg::readImageFromDicomInputStream);
            File dcmFile = new File(dcmFilename);
            File imageFile = new File(jpgFilename);
            dcm2Jpg.convert(dcmFile, imageFile);
            status.status = true;
            status.message = "convert DICOM to JPEG successful";
            return status;
        } catch (Exception e) {
            status.status = false;
            status.message = "Failure: " + e.toString();
            return status;
        }
    }
    static final String dcmPath = "L:\\sampleDicom\\siim-arc-pneumothorax\\1lSM4E.dcm";
    static final String jpgPath = "L:\\sampleDicom\\siim-arc-pneumothorax\\1lSM4E.jpg";
    public static void main(String[] args) throws Exception {
        try {
            ConvertStatus status = convertDcmToJpgFromFilename(dcmPath, jpgPath);
            System.out.println(status.message);
        } catch (Exception e) {
            System.out.println(e.toString());
            throw new Exception("dcm2jpg to JPG failure!");
        }
    }
}
