import { S3FileUploadProvider } from 'src/file-upload/providers/s3-file-upload.provider';

export function fileUploadProviderFactory(
  provider: string | 'aws',
  configService: any,
): any {
  if (provider != null && provider.toLocaleLowerCase() === 'aws') {
    return new S3FileUploadProvider(configService);
  }
}
