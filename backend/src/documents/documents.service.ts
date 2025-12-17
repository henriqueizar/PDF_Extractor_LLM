import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OcrService } from '../ocr/ocr.service';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService, private ocrService: OcrService) {}

  async create(userId: string, file: Express.Multer.File) {
    return this.prisma.document.create({
      data: {
        userId,
        filename: file.filename,
        originalName: file.originalname, 
        filePath: file.path,
        status: 'PENDING',
      },
    });
  }

  async process(documentId: string) {
  const document = await this.prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    throw new Error('Document not found');
  }

  await this.prisma.document.update({
    where: { id: documentId },
    data: { status: 'PROCESSING' },
  });

  const fullPath = path.resolve(document.filePath);

  const text = await this.ocrService.extractText(fullPath);

  return this.prisma.document.update({
    where: { id: documentId },
    data: {
      extractedText: text,
      status: 'COMPLETED',
    },
  });
}
}