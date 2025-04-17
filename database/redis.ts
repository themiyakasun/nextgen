import { Redis } from '@upstash/redis';

import config from '@/config';

const redis = new Redis({
  url: config.env.uptash.redisUrl,
  token: config.env.uptash.redisToken,
});

export default redis;
