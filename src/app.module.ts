import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MineflayerModule } from './modules/mineflayer/mineflayer.module';

@Module({
  imports: [MineflayerModule, ConfigModule.forRoot(), PrismaModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
