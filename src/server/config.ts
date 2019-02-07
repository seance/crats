import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  interface: string;
  port: number;
}

export const config: Config = {
  interface: process.env.SERVER_INTERFACE || 'localhost',
  port: parseInt(process.env.SERVER_PORT || '8080'),
};
