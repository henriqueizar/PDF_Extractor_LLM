import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ PrismaModule,DocumentsModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // caminho da pasta fisica
      serveRoot: '/uploads', // URL (http://localhost:3000/uploads/nome)
    }),],
  controllers: [AppController],
  providers: [AppService, PrismaService],

})
export class AppModule {}
