import { Module } from '@nestjs/common';
import { EthersModule } from '../ethersModule/ethers.module';
import { MineflayerService } from './mineflayer.service';

@Module({
    imports: [EthersModule],
    providers: [MineflayerService]
})
export class MineflayerModule {}