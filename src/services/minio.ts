import { MinioModel } from '../models/minio';

export default class MinioService {
  /**
   * Generates a presigned URL for uploading an object to a MinIO bucket.
   *
   * @param {string} bucketName - The name of the MinIO bucket.
   * @param {string} fileName - The name of the file to be uploaded.
   * @return {Promise<string>} A promise that resolves to the presigned URL for uploading the object.
   */
  static presignedPutObject(bucketName: string, fileName: string) {
    return MinioModel.presignedPutObject(bucketName, fileName);
  }

  /**
   * Retrieves the upload URL from MinIO.
   *
   * @return {Promise<string>} A promise that resolves to the upload URL from MinIO.
   */
  static async getUploadUrl() {
    return MinioModel.getUploadUrl();
  }

  /**
   * Retrieves the read URL for a given file name.
   *
   * @param {string} fileName - The name of the file.
   * @return {Promise<string>} A promise that resolves to the read URL of the file.
   */
  static async getReadUrl(fileName: string) {
    try {
      return MinioModel.getReadUrl(fileName);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Deletes an object from the MinIO bucket.
   *
   * @param {string} fileName - The name of the file to be deleted.
   * @return {Promise<void>} A promise that resolves when the object is successfully deleted, or rejects with an error if there was an issue.
   */
  static async deleteObject(fileName: string) {
    try {
      return MinioModel.deleteObject(fileName);
    } catch (err) {
      console.log(err);
    }
  }
}
