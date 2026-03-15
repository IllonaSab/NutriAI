-- CreateTable
CREATE TABLE "JourData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "humeur" INTEGER,
    "repas" TEXT,
    "eau" INTEGER DEFAULT 0,
    "victoire" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JourData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JourData" ADD CONSTRAINT "JourData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
