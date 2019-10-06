import axios from 'axios'
import { getGamePlaysFailure, getGamePlaysStarted, getGamePlaysSuccess } from '../../actions/index'

const globalAny: any = global

export const getGamePlays = () => (dispatch: any) => {
  dispatch(getGamePlaysStarted())
   dispatch(
    getGamePlaysSuccess([
      {
        id: '1',
        boxes: [
          {
            id: 'box0',
          },
        ],
        player1: '1',
      },
    ])
  )
}
