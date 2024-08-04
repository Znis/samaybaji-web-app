import config from '../config';
import minioClient, { bucketName } from '../minioFile';
import { v4 as uuid } from 'uuid';

export class MinioModel {
  /**
   * Generates a presigned URL for uploading an object to a MinIO bucket.
   *
   * @param {string} bucketName - The name of the MinIO bucket.
   * @param {string} fileName - The name of the file to be uploaded.
   * @return {string} A presigned URL for uploading the object.
   */
  static presignedPutObject(bucketName: string, fileName: string) {
    return minioClient.presignedPutObject(
      bucketName,
      fileName,
      config.minio.GET_TIME,
    );
  }

  /**
   * Generates a presigned URL for uploading an object to the Minio bucket.
   *
   * @return {Promise<{ url: string, fileName: string, bucketName: string }>} A promise that resolves to an object containing the generated URL, file name, and bucket name.
   */
  static async getUploadUrl() {
    const uuidName = uuid();
    const url = await minioClient.presignedPutObject(
      bucketName,
      uuidName,
      config.minio.PUT_TIME,
    );
    return { url: url, fileName: uuidName, bucketName: bucketName };
  }

  /**
   * Retrieves a pre-signed URL for reading an object from the Minio bucket.
   *
   * @param {string} fileName - The name of the object to be read.
   * @return {Promise<string>} A promise that resolves to the pre-signed URL for reading the object.
   */
  static async getReadUrl(fileName: string) {
    return minioClient.presignedGetObject(
      bucketName,
      fileName,
      config.minio.GET_TIME,
    );
  }

  /**
   * Deletes an object from the MinIO bucket.
   *
   * @param {string} fileName - The name of the object to be deleted.
   * @return {Promise<void>} A promise that resolves when the object is successfully deleted.
   */
  static async deleteObject(fileName: string) {
    await minioClient.removeObject(bucketName, fileName);
  }
}
