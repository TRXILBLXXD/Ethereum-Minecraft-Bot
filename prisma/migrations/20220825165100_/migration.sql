-- CreateTable
CREATE TABLE "UserWallet" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,

    CONSTRAINT "UserWallet_pkey" PRIMARY KEY ("id")
);
