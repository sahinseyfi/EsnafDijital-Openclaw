-- CreateEnum
CREATE TYPE "BusinessSegment" AS ENUM ('berber', 'guzellik', 'kafe_restoran', 'diger');

-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('lead', 'active', 'paused');

-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('new', 'reviewed', 'offered');

-- CreateEnum
CREATE TYPE "ChannelReadiness" AS ENUM ('dusuk', 'orta', 'iyi');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('draft', 'sent', 'approved');

-- CreateEnum
CREATE TYPE "DeliveryProjectStatus" AS ENUM ('kickoff', 'building', 'live', 'maintenance');

-- CreateEnum
CREATE TYPE "ConsultationType" AS ENUM ('sales', 'technical', 'shared');

-- CreateEnum
CREATE TYPE "ConsultationStage" AS ENUM ('draft', 'clarifying', 'goal_set', 'context_ready', 'blocked', 'internal', 'external', 'ready_to_send', 'answered', 'actioned');

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('open', 'archived');

-- CreateEnum
CREATE TYPE "ConsultationRoute" AS ENUM ('blocked', 'internal', 'external');

-- CreateEnum
CREATE TYPE "ConsultationOwnerRole" AS ENUM ('user', 'tech_agent', 'shared');

-- CreateEnum
CREATE TYPE "ConsultationActionType" AS ENUM ('decision_note', 'project_task', 'followup');

-- CreateEnum
CREATE TYPE "ConsultationActionStatus" AS ENUM ('open', 'done', 'cancelled');

-- DropForeignKey
ALTER TABLE "public"."Audit" DROP CONSTRAINT "Audit_businessId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Consultation" DROP CONSTRAINT "Consultation_businessId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DeliveryProject" DROP CONSTRAINT "DeliveryProject_businessId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DeliveryProject" DROP CONSTRAINT "DeliveryProject_offerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Offer" DROP CONSTRAINT "Offer_businessId_fkey";

-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "businessId",
DROP COLUMN "generatedPrompt",
DROP COLUMN "outputSummary",
DROP COLUMN "request",
DROP COLUMN "selectedContext",
ADD COLUMN     "consultRoute" "ConsultationRoute",
ADD COLUMN     "decisionQuestion" TEXT,
ADD COLUMN     "dueAt" TIMESTAMP(3),
ADD COLUMN     "goal" TEXT,
ADD COLUMN     "ownerRole" "ConsultationOwnerRole",
ADD COLUMN     "stage" "ConsultationStage" NOT NULL DEFAULT 'draft',
ADD COLUMN     "status" "ConsultationStatus" NOT NULL DEFAULT 'open',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "ConsultationType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "whyNow" TEXT;

-- DropTable
DROP TABLE "public"."Audit";

-- DropTable
DROP TABLE "public"."Business";

-- DropTable
DROP TABLE "public"."DeliveryProject";

-- DropTable
DROP TABLE "public"."Offer";

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "segment" "BusinessSegment" NOT NULL,
    "district" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "status" "BusinessStatus" NOT NULL DEFAULT 'lead',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audits" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "status" "AuditStatus" NOT NULL DEFAULT 'new',
    "channelReadiness" "ChannelReadiness" NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "status" "OfferStatus" NOT NULL DEFAULT 'draft',
    "packageName" TEXT NOT NULL,
    "amountTry" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_projects" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "status" "DeliveryProjectStatus" NOT NULL DEFAULT 'kickoff',
    "scope" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationBrief" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "businessJson" JSONB,
    "technicalJson" JSONB,
    "sharedJson" JSONB,
    "contextRefsJson" JSONB,
    "constraintsJson" JSONB,
    "successCriteria" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationBrief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationRun" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "modelName" TEXT,
    "promptText" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "responseRaw" TEXT,
    "responseSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsultationRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationAction" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "ownerRole" "ConsultationOwnerRole" NOT NULL,
    "actionType" "ConsultationActionType" NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ConsultationActionStatus" NOT NULL DEFAULT 'open',
    "linkedEntityType" TEXT,
    "linkedEntityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "audits_businessId_idx" ON "audits"("businessId");

-- CreateIndex
CREATE INDEX "offers_businessId_idx" ON "offers"("businessId");

-- CreateIndex
CREATE INDEX "delivery_projects_businessId_idx" ON "delivery_projects"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationBrief_consultationId_key" ON "ConsultationBrief"("consultationId");

-- AddForeignKey
ALTER TABLE "audits" ADD CONSTRAINT "audits_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_projects" ADD CONSTRAINT "delivery_projects_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationBrief" ADD CONSTRAINT "ConsultationBrief_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationRun" ADD CONSTRAINT "ConsultationRun_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationAction" ADD CONSTRAINT "ConsultationAction_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
