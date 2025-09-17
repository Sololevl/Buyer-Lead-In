/*
  Warnings:

  - The values [One,Two,Three,Four] on the enum `BHK` will be removed. If these variants are still used in the database, this will fail.
  - The values [Walk-in] on the enum `Source` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BHK_new" AS ENUM ('Studio', '1', '2', '3', '4');
ALTER TABLE "public"."buyers" ALTER COLUMN "bhk" TYPE "public"."BHK_new" USING ("bhk"::text::"public"."BHK_new");
ALTER TYPE "public"."BHK" RENAME TO "BHK_old";
ALTER TYPE "public"."BHK_new" RENAME TO "BHK";
DROP TYPE "public"."BHK_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Source_new" AS ENUM ('Website', 'Referral', 'WalkIn', 'Call', 'Other');
ALTER TABLE "public"."buyers" ALTER COLUMN "source" TYPE "public"."Source_new" USING ("source"::text::"public"."Source_new");
ALTER TYPE "public"."Source" RENAME TO "Source_old";
ALTER TYPE "public"."Source_new" RENAME TO "Source";
DROP TYPE "public"."Source_old";
COMMIT;
