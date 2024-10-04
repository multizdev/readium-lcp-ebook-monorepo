-- CreateTable
CREATE TABLE "content" (
    "id" VARCHAR(255) NOT NULL,
    "encryption_key" BYTEA NOT NULL,
    "location" TEXT NOT NULL,
    "length" BIGINT,
    "sha256" VARCHAR(64),
    "type" VARCHAR(255) NOT NULL DEFAULT 'application/epub+zip',

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "device_name" VARCHAR(255),
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" INTEGER NOT NULL,
    "device_id" VARCHAR(255),
    "license_status_fk" INTEGER NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license" (
    "id" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "issued" TIMESTAMP(0) NOT NULL,
    "updated" TIMESTAMP(0),
    "rights_print" INTEGER,
    "rights_copy" INTEGER,
    "rights_start" TIMESTAMP(0),
    "rights_end" TIMESTAMP(0),
    "content_fk" VARCHAR(255) NOT NULL,
    "lsd_status" INTEGER DEFAULT 0,

    CONSTRAINT "license_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "license_status" (
    "id" SERIAL NOT NULL,
    "status" SMALLINT NOT NULL,
    "license_updated" TIMESTAMP(3) NOT NULL,
    "status_updated" TIMESTAMP(3) NOT NULL,
    "device_count" SMALLINT,
    "potential_rights_end" TIMESTAMP(3),
    "license_ref" VARCHAR(255) NOT NULL,
    "rights_end" TIMESTAMP(3),

    CONSTRAINT "license_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" SERIAL NOT NULL,
    "content_id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "authors" TEXT[],
    "categories" TEXT[],

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "license_status_fk_index" ON "event"("license_status_fk");

-- CreateIndex
CREATE INDEX "license_ref_index" ON "license_status"("license_ref");

-- CreateIndex
CREATE INDEX "content_id_index" ON "metadata"("content_id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_license_status_fk_fkey" FOREIGN KEY ("license_status_fk") REFERENCES "license_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "license" ADD CONSTRAINT "license_content_fk_fkey" FOREIGN KEY ("content_fk") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

