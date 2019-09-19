import { Tictac } from '../../models/TicTac';
import { TictacRepository } from '../../repository/tictac';
import { ID_Input } from '../../prisma/generated/prisma-client';

export class TictacService {
  private repo: TictacRepository;
  constructor(repo: TictacRepository) {
    this.repo = repo;
  }
  async getGamePlays(): Promise<Tictac[]> {
    const gamePlays = await this.repo.gamePlays();
    return gamePlays;
  }
  async getGamePlay(id: any): Promise<Tictac> {
    const gamePlay = await this.repo.gamePlay(id);
    return gamePlay;
  }
  async saveGamePlay(tictac: Tictac): Promise<Tictac> {
    const gamePlay = await this.repo.saveGamePlay(tictac);
    return gamePlay;
  }
}
