import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ethers } from 'ethers';

@Injectable()
export class EthersService {
  constructor(private prismaService: PrismaService) {}

  provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);

  async createWallet(user: string) {
    try {
      const wallet = ethers.Wallet.createRandom();
      const data = await this.prismaService.userWallet.create({
        data: {
          username: user,
          privateKey: wallet.privateKey,
          address: wallet.address,
        },
      });
      return wallet.address;
    } catch {
      return 'Umm...';
    }
  }

  async getWallet(user: string) {
    const data = await this.prismaService.userWallet.findUnique({
      where: { username: user },
    });
    const balance = await this.provider.getBalance(data.address);
    return {
      address: data.address,
      balance: ethers.utils.formatEther(balance),
    };
  }

  async sendToOtherAddress(user: string, to: string, amount: string) {
    if (!ethers.utils.isAddress(to)) return 'Wrong address';
    const data = await this.prismaService.userWallet.findUnique({
      where: { username: user },
    });
    const value = ethers.utils.parseEther(amount);
    const wallet = new ethers.Wallet(data.privateKey);
    const signer = wallet.connect(this.provider);
    const tx = {
      from: wallet.address,
      to: to,
      value: value,
    };
    await signer.sendTransaction(tx);
    return 'Transaction approved';
  }
}
