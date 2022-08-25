import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { EthersService } from "./ethers.service";

@Global()
@Module({
    imports: [PrismaModule],
    providers: [EthersService],
    exports: [EthersService]
})
export class EthersModule {}