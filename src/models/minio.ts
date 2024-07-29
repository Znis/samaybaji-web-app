import minioClient, { bucketName } from '../minioFile';
import { v4 as uuid } from 'uuid';

export class MinioModel {
  static presignedPutObject(bucketName: string, fileName: string) {
    return minioClient.presignedPutObject(bucketName, fileName, 5 * 60);
  }

  static async getUploadUrl() {
    const uuidName = uuid();
    const url = await minioClient.presignedPutObject(
      bucketName,
      uuidName,
      5 * 60,
    );
    return { url: url, fileName: uuidName, bucketName: bucketName };
  }

  static async getReadUrl(fileName: string) {
    return minioClient.presignedGetObject(bucketName, fileName, 5 * 60);
  }

  static async deleteObject(fileName: string) {
    await minioClient.removeObject(bucketName, fileName);
  }
}
