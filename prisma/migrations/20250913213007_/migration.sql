/*
  Warnings:

  - The values [1,2,3,4] on the enum `BHK` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BHK_new" AS ENUM ('Studio', 'One', 'Two', 'Three', 'Four');
ALTER TABLE "public"."buyers" ALTER COLUMN "bhk" TYPE "public"."BHK_new" USING ("bhk"::text::"public"."BHK_new");
ALTER TYPE "public"."BHK" RENAME TO "BHK_old";
ALTER TYPE "public"."BHK_new" RENAME TO "BHK";
DROP TYPE "public"."BHK_old";
COMMIT;
