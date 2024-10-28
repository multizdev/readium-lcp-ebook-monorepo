-- AlterTable
ALTER TABLE "metadata" ADD COLUMN     "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publication_place" TEXT NOT NULL DEFAULT 'Country',
ADD COLUMN     "publisher" TEXT NOT NULL DEFAULT 'None',
ADD COLUMN     "what_its_about" TEXT NOT NULL DEFAULT 'What''s it about?',
ADD COLUMN     "who_it_for" TEXT NOT NULL DEFAULT 'Who is it for?';
