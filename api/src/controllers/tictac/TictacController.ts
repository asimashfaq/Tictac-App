import { Request, Response } from 'express';
import { GamePlayAdd, GameSearch } from '../../models/TicTac';
import { TictacService } from '../../services/tictac';
import { TictacRepository } from '../../repository/tictac';
class TictacController {
  private tictacService: TictacService;
  constructor() {
    this.tictacService = new TictacService(new TictacRepository());
  }
  index = async (req: Request, res: Response) => {
    const gameplays = await this.tictacService.getGamePlays();
    res.json(gameplays);
  };
  search = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const value = await GameSearch.validateAsync({ id });
      if (value) {
        const gameplay = await this.tictacService.getGamePlay(req.params.id);
        res.json(gameplay);
      }
    } catch (err) {
      res.json(err.details);
    }
  };
  add = async (req: Request, res: Response) => {
    try {
      const value = await GamePlayAdd.validateAsync(req.body);
      if (value) {
        const gameplay = await this.tictacService.saveGamePlay(req.body);
        res.json(gameplay);
      }
    } catch (err) {
      res.json(err.details);
    }
  };
}
export default new TictacController();
