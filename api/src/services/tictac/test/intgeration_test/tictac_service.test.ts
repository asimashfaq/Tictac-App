import { Tictac, Box } from '../../../../models/TicTac';
import { TictacService } from '../..';
import { TictacRepository } from '../../../../repository/tictac';
import { prisma as db } from '../../../../prisma/generated/prisma-client';
// Check when the db is empty
test('getGameplay_noGameplayInDB_emptyList', async () => {
  await db.deleteManyGamePlays({});
  const tictacSerivce = new TictacService(new TictacRepository());
  const history: Tictac[] = await tictacSerivce.getGamePlays();
  expect(history.length).toBe(0);
});

test('saveGameplay_saveGameplayInDB_returnId', async () => {
  const tictacSerivce = new TictacService(new TictacRepository());
  const gameplay = new Tictac('1', 'testplayer', 'x', '1', false, [
    new Box('box0', 1, 1, 'x'),
    new Box('box4', 1, 3, 'x'),
    new Box('box8', 1, 5, 'x'),
    new Box('box2', 2, 2, 'o'),
    new Box('box3', 2, 4, 'o')
  ]);
  const stictac: Tictac = await tictacSerivce.saveGamePlay(gameplay);
  const tictac: Tictac = await tictacSerivce.getGamePlay(stictac.id);
  expect(stictac.id).toEqual(tictac.id);
});
test('getGameplay_oneGameplayInDB_ListOneGameplay', async () => {
  const tictacSerivce = new TictacService(new TictacRepository());
  const history: Tictac[] = await tictacSerivce.getGamePlays();
  expect(history.length).toBe(1);
  const deleterecord: Tictac[] = await db
    .gamePlays({ where: { player1: 'testplayer' } })
    .$fragment('{id}');
  if (deleterecord.length > 0) {
    await db.deleteGamePlay({ id: deleterecord[0].id });
  }
});
