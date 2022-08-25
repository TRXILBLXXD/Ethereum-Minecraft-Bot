import { Injectable } from '@nestjs/common';
import * as mineflayer from 'node_modules/mineflayer';
import { EthersService } from '../ethersModule/ethers.service';

@Injectable()
export class MineflayerService {

    constructor(private ethersService: EthersService) {
        this.bot = mineflayer.createBot(this.options)
        this.initBot()
    }

    bot: mineflayer.Bot

    options = {
        host: process.env.MINECRAFT_SERVER,
        username: process.env.USERNAME
    }

    async initBot() {

        this.bot.on('whisper', async (username, message) => {
            if (username == this.bot.username) return
            const msg = message.split(' ')
            const param1 = msg[1]
            const param2 = msg[2]
            if (msg[0] == 'me') {
                try {
                const data = await this.ethersService.getWallet(username);
                this.bot.whisper(username, `Youre wallet address is ${data.address}, youre balance is ${data.balance}`)
                } catch {
                    this.bot.whisper(username, "Error")
                }
            }
            if (msg[0] == 'create') {
                const data = await this.ethersService.createWallet(username)
                this.bot.whisper(username,`Youre wallet address is ${data}!`)
            }
            if (msg[0] == 'send') {
                const data = await this.ethersService.sendToOtherAddress(username, param1, param2)
                this.bot.whisper(username,`${data}`)
            }
        })
    }
}