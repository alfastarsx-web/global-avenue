/*
  Warnings:

  - You are about to drop the column `body` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Unit" ADD COLUMN "image" TEXT;

-- CreateTable
CREATE TABLE "ProgressUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "projectName" TEXT,
    "date" DATETIME NOT NULL,
    "image" TEXT,
    "titleUz" TEXT,
    "titleRu" TEXT,
    "textUz" TEXT,
    "textRu" TEXT,
    "percent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProgressUpdate_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "roleUz" TEXT,
    "roleRu" TEXT,
    "initials" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titleUz" TEXT,
    "titleRu" TEXT,
    "locationUz" TEXT,
    "locationRu" TEXT,
    "typeUz" TEXT,
    "typeRu" TEXT,
    "requirements" TEXT NOT NULL DEFAULT '[]',
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'news',
    "titleUz" TEXT,
    "titleRu" TEXT,
    "excerptUz" TEXT,
    "excerptRu" TEXT,
    "bodyUz" TEXT NOT NULL DEFAULT '[]',
    "bodyRu" TEXT NOT NULL DEFAULT '[]',
    "author" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "coverImage" TEXT,
    "readMinutes" INTEGER,
    "date" DATETIME,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Post" ("author", "coverImage", "createdAt", "id", "publishedAt", "status", "updatedAt") SELECT "author", "coverImage", "createdAt", "id", "publishedAt", "status", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "taglineUz" TEXT,
    "taglineRu" TEXT,
    "status" TEXT NOT NULL DEFAULT 'building',
    "districtUz" TEXT,
    "districtRu" TEXT,
    "districtKey" TEXT,
    "addressUz" TEXT,
    "addressRu" TEXT,
    "pricePerSqm" REAL,
    "priceFrom" REAL,
    "priceTo" REAL,
    "handoverUz" TEXT,
    "handoverRu" TEXT,
    "handoverYear" INTEGER,
    "floors" INTEGER,
    "apartments" INTEGER,
    "blocks" INTEGER,
    "roomOptions" TEXT NOT NULL DEFAULT '[]',
    "cover" TEXT,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "descriptionUz" TEXT,
    "descriptionRu" TEXT,
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "infrastructure" TEXT NOT NULL DEFAULT '[]',
    "schedule" TEXT NOT NULL DEFAULT '[]',
    "passport" TEXT NOT NULL DEFAULT '[]',
    "geoLat" REAL,
    "geoLng" REAL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "delivery" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "delivery", "id", "name", "priceFrom", "priceTo", "status", "updatedAt") SELECT "createdAt", "delivery", "id", "name", "priceFrom", "priceTo", "status", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE TABLE "new_Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "projectId" TEXT,
    "projectName" TEXT,
    "roleUz" TEXT,
    "roleRu" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "source" TEXT,
    "youtubeUrl" TEXT,
    "hasVideo" BOOLEAN NOT NULL DEFAULT false,
    "textUz" TEXT,
    "textRu" TEXT,
    "status" TEXT NOT NULL DEFAULT 'published',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Testimonial_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Testimonial" ("clientName", "createdAt", "id", "projectId", "projectName", "rating", "source", "status", "youtubeUrl") SELECT "clientName", "createdAt", "id", "projectId", "projectName", "rating", "source", "status", "youtubeUrl" FROM "Testimonial";
DROP TABLE "Testimonial";
ALTER TABLE "new_Testimonial" RENAME TO "Testimonial";
CREATE INDEX "Testimonial_projectId_idx" ON "Testimonial"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "ProgressUpdate_projectId_idx" ON "ProgressUpdate"("projectId");
