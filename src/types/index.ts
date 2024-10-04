import { Prisma } from '@prisma/client';

type ContentWithMetadata = Prisma.contentGetPayload<{
  include: { metadata: true };
}>;

export type { ContentWithMetadata };
