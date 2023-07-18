import { Global, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ConfigService } from '@nestjs/config';
import { fileUploadProviderFactory } from 'src/shared/factory.provider';

@Global()
@Module({
  providers: [
    FileUploadService,
    {
      provide: 'FileUploadProvider',
      useFactory: (configService: ConfigService) => {
        return fileUploadProviderFactory(
          configService.get('FILE_UPLOAD_PROVIDER'),
          configService,
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [FileUploadService],
})
export class FileUploadModule {}
