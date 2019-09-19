import { Router } from 'express';
import * as cors from 'cors';

import * as parser from 'body-parser';
import * as compression from 'compression';

export const handleCors = (router: Router) => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.json());
  router.use(parser.urlencoded({ extended: true }));
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};
