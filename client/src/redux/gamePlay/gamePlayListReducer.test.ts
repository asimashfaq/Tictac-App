import gamePlayListReducer, {INITIAL_STATE} from './gamePlayListReducer'
import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS } from './actions';
describe('gamePlayListReducer',() => {
    it("returns the initial state correctly", () => {
        const reducer = gamePlayListReducer(undefined, {} as rProps);
        expect(reducer).toEqual(INITIAL_STATE);
      });
})

it("handles FETCH_LIST_REQUEST as expected", () => {
    const reducer = gamePlayListReducer(INITIAL_STATE, { type: FETCH_LIST_REQUEST,payload:undefined });

    expect(reducer).toEqual({
        data: [],
        fetching: true,
        error: null,
        gameplay: {
          winner: '0',
          player1: '-',
          player2: '-',
          boxes: [],
          draw: true,
        },
    });
  });

  it("handles FETCH_LIST_SUCCESS as expected", () => {
    const reducer = gamePlayListReducer(INITIAL_STATE, {
      type: FETCH_LIST_SUCCESS,
      payload:  [{                
            "boxes": [
            {
              "id": "box0",
            },
          ],
          "player1": "1"
        }]
      
    });

    expect(reducer).toEqual({
      data: [{                
        "boxes": [
        {
          "id": "box0",
        },
      ],
      "player1": "1"
    }],
      fetching: false,
      error: null,
      gameplay: {
        winner: '0',
        player1: '-',
        player2: '-', 
        boxes: [],
        draw: true,
      }
    });
  });