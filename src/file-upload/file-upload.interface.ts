export interface FileUploadProvider {
  upload(file: Express.Multer.File): Promise<UploadedFile>;
}

export interface UploadedFile {
  name: string;
  url: string;
}
