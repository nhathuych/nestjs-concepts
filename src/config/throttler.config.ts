import { ThrottlerOptions } from '@nestjs/throttler';
import 'dotenv/config';

export const throttlerConfigs: ThrottlerOptions[] = [
  {
    name: 'default',
    ttl: Number(process.env.THROTTLE_TTL || 60000),
    limit: Number(process.env.THROTTLE_LIMIT || 5),
  },
];
