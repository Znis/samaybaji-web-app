import { MinioModel } from '../models/minio';

export default class MinioService {
  static presignedPutObject(bucketName: string, fileName: string) {
    return MinioModel.presignedPutObject(bucketName, fileName);
  }

  static async getUploadUrl() {
    return MinioModel.getUploadUrl();
  }

  static async getReadUrl(fileName: string) {
    try {
      return MinioModel.getReadUrl(fileName);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteObject(fileName: string) {
    try {
      return MinioModel.deleteObject(fileName);
    } catch (err) {
      console.log(err);
    }
  }
}
