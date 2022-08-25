import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { MineflayerModule } from './modules/mineflayer/mineflayer.module';

@Module({
  imports: [MineflayerModule, ConfigModule.forRoot(), PrismaModule.forRoot()]
})
export class AppModule {}
