/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `JourData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JourData_userId_date_key" ON "JourData"("userId", "date");
