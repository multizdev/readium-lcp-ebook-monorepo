import { Prisma } from '@prisma/client';

type ContentWithMetadata = Prisma.contentGetPayload<{
  include: { metadata: true };
}>;

type Publication = Prisma.licenseGetPayload<{
  include: { content: { select: { metadata: true } } };
}>;

export type { ContentWithMetadata, Publication };
