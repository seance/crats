import { AddressInfo } from 'net';
import * as path from 'path';
import * as R from 'ramda';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { MessageResponse } from '../common/types';
import { foo } from '../common/lib';
import { config } from './config';

const app = express();

app.get('/api/v1/message', (req: Request, res: Response, next: NextFunction) => {
  const message: MessageResponse = { message: foo(Math.floor(Math.random() * 10)) };
  res.send(message);
});

if (process.env.NODE_ENV === 'production') {
  const build = path.join(__dirname, '../../build');

  app.use(express.static(build));
  app.get('*', function(req, res) {
    res.sendFile(path.join(build, 'index.html'));
  });
}

const server = app.listen(config.port, config.interface, () => {
  const isAddressInfo = (x: any): x is AddressInfo =>
    'address' in x && 'port' in x;

  const addressString = R.cond([
    [R.is(String), R.identity],
    [isAddressInfo, ({ address, port }) => `${address}:${port}`],
  ]);

  // tslint:disable-next-line:no-console
  console.log(`Listening at ${addressString(server.address())}...`);
});
