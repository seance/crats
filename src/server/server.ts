import * as path from 'path';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { MessageResponse } from '../common/types';
import { foo } from '../common/lib';

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

const server = app.listen('8080', () => {
    console.log(`Listening at 8080...`);
});
