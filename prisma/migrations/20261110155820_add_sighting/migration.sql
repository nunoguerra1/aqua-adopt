-- CreateEnum
CREATE TYPE "SightingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SpeciesGroup" AS ENUM ('TURTLE', 'CETACEAN', 'PINNIPED', 'SEABIRD', 'OTHER', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Sighting" (
    "id" TEXT NOT NULL,
    "reporterName" TEXT,
    "speciesGroup" "SpeciesGroup" NOT NULL DEFAULT 'UNKNOWN',
    "placeText" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SightingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sighting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Sighting_status_createdAt_idx" ON "Sighting"("status", "createdAt");
