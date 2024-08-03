import config from '../config';
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
      config.minio.PUT_TIME,
    );
    return { url: url, fileName: uuidName, bucketName: bucketName };
  }

  static async getReadUrl(fileName: string) {
    return minioClient.presignedGetObject(
      bucketName,
      fileName,
      config.minio.GET_TIME,
    );
  }

  static async deleteObject(fileName: string) {
    await minioClient.removeObject(bucketName, fileName);
  }
}
