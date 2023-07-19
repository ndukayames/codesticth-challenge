import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './shared/repository/prisma/prisma.service';
import { PrismaModule } from './shared/repository/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { UserJwtStrategy } from './shared/strategies/user-jwt.strategy';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { AdminJwtStrategy } from './shared/strategies/admin-jwt.strategy';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ProductsModule,
    FileUploadModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserJwtStrategy, AdminJwtStrategy],
})
export class AppModule {}
