import TictacController from './TictacController';

export default [
  {
    path: '/gameplays',
    method: 'get',
    handler: TictacController.index
  },
  {
    path: '/gameplay/:id',
    method: 'get',
    handler: TictacController.search
  },
  {
    path: '/gameplay',
    method: 'post',
    handler: TictacController.add
  }
];
