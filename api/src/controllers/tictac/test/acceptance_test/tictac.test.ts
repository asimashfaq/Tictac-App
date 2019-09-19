import * as request from 'supertest';
import app from '../../../../app';
import { TictacService } from '../../../../services/tictac';
import { TictacRepository } from '../../../../repository/tictac';
import { Tictac, Box } from '../../../../models/TicTac';
import * as sampleGameplay from '../../../../models/Sample.json';
describe('Get /gameplays', () => {
  it('SHOULD return 200Ok', done => {
    request(app)
      .get('/gameplays')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
  it('SHOULD return 200Ok', done => {
    request(app)
      .post('/gameplay')
      .send()
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

describe('Post /gameplay', () => {
  it('SHOULD return save record', done => {
    request(app)
      .post('/gameplay')
      .send(sampleGameplay)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
describe('Get /gameplay', () => {
  it('SHOULD return return 1 gampeplay', async done => {
    const gameplay = new Tictac('1', 'testplayer', 'x', '1', false, [
      new Box('box0', 1, 1, 'x'),
      new Box('box4', 1, 3, 'x'),
      new Box('box8', 1, 5, 'x'),
      new Box('box2', 2, 2, 'o'),
      new Box('box3', 2, 4, 'o')
    ]);
    const tictacSerivce = new TictacService(new TictacRepository());
    const stictac: Tictac = await tictacSerivce.saveGamePlay(gameplay);
    request(app)
      .get(`/gameplay/${stictac.id}`)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
