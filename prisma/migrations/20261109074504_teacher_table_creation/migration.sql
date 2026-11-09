-- CreateTable
CREATE TABLE "Teachers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("id")
);
