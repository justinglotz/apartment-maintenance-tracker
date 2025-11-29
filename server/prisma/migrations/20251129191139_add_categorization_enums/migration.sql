/*
  Warnings:

  - The `status` column on the `issues` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `category` on the `issues` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priority` on the `issues` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TENANT', 'LANDLORD', 'ADMIN');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PLUMBING', 'ELECTRICAL', 'HVAC', 'STRUCTURAL', 'APPLIANCE', 'PEST_CONTROL', 'LOCKS_KEYS', 'FLOORING', 'WALLS_CEILING', 'WINDOWS_DOORS', 'LANDSCAPING', 'PARKING', 'OTHER');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- AlterTable
ALTER TABLE "issues" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL,
DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "acknowledged_date" DROP NOT NULL,
ALTER COLUMN "resolved_date" DROP NOT NULL,
ALTER COLUMN "closed_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "is_read" SET DEFAULT false,
ALTER COLUMN "read_at" DROP NOT NULL,
ALTER COLUMN "sent_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'TENANT';

-- CreateIndex
CREATE INDEX "issues_user_id_idx" ON "issues"("user_id");

-- CreateIndex
CREATE INDEX "issues_complex_id_idx" ON "issues"("complex_id");

-- CreateIndex
CREATE INDEX "issues_status_idx" ON "issues"("status");

-- CreateIndex
CREATE INDEX "issues_category_idx" ON "issues"("category");

-- CreateIndex
CREATE INDEX "issues_priority_idx" ON "issues"("priority");
