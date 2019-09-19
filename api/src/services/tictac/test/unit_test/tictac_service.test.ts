import { Tictac,  Box } from "../../../../models/TicTac";
import { TictacService } from "../..";
import { ITictacRepository } from "../../../../repository/tictac";
  test("getGameplay_noGameplayInDB_emptyList", async () => {
    
    const tictacSerivce = new TictacService(new EmptyMockRepository());
    const gamePlays: Tictac[] = await tictacSerivce.getGamePlays();
    expect(gamePlays.length).toBe(0);
  });
  test("getGameplay_oneGameplayInDB_ListOneGameplay", async () => {
 
    const tictacSerivce = new TictacService(new SingleMockRepository());
    const gamePlays: Tictac[] = await tictacSerivce.getGamePlays();
    expect(gamePlays.length).toBe(1);
  });


  class EmptyMockRepository implements ITictacRepository {
    async gamePlays(): Promise<Tictac[]> {
     return [];
    }
    async gamePlay(id:string):Promise<Tictac>{
      return ;
    }
    async saveGamePlay(tictac:Tictac):Promise<Tictac>{
      return;
    }
  }
  class SingleMockRepository implements ITictacRepository {
    async gamePlays(): Promise<Tictac[]> {
     return [new Tictac("1","o","x","1",false,
     [
         new Box("box0",1,1,'x'),
         new Box("box4",1,3,'x'),
         new Box("box8",1,5,'x'),
         new Box("box2",2,2,'o'),
         new Box("box3",2,4,'o')    
     ]
    )];
    }
    async gamePlay(id:string):Promise<Tictac>{
      return ;
    }
    async saveGamePlay(tictac:Tictac):Promise<Tictac>{
      return;
    }
  }