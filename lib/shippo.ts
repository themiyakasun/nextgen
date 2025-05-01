import config from '@/config';
import { Shippo } from 'shippo';

const shippo = new Shippo({
  apiKeyHeader: `ShippoToken ${config.env.shippo.token}`,
  shippoApiVersion: '2018-02-08',
});

export default shippo;
