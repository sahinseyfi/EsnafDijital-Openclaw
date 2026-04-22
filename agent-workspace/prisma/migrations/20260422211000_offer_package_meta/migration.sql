-- CreateEnum
CREATE TYPE "OfferDomainPreference" AS ENUM ('subdomain', 'custom_domain');

-- AlterTable
ALTER TABLE "offers"
ADD COLUMN     "addonKeys" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "domainPreference" "OfferDomainPreference" NOT NULL DEFAULT 'subdomain',
ADD COLUMN     "customDomain" TEXT;
