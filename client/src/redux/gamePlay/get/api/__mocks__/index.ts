import { getGamePlayFailure, getGamePlayStarted, getGamePlaySuccess } from '../../actions/index'

export const getGamePlay = (id: string, errorMsg: boolean = false, loadingMsg: boolean = false) => (
  dispatch: any
) => {
  dispatch(getGamePlayStarted())
  if (!loadingMsg) {
    if (!errorMsg) {
      dispatch(
        getGamePlaySuccess({
          id: '1',
          boxes: [
            {
              id: 'box0',
              value: 'x',
            },
            {
              id: 'box1',
              value: 'x',
            },
            {
              id: 'box2',
              value: 'x',
            },
            {
              id: 'box3',
              value: 'x',
            },
            {
              id: 'box4',
              value: 'x',
            },
            {
              id: 'box5',
              value: 'x',
            },
            {
              id: 'box6',
              value: 'x',
            },
            {
              id: 'box7',
              value: 'x',
            },
            {
              id: 'box8',
              value: 'x',
            },
          ],
          player1: '1',
        })
      )
    } else {
      dispatch(getGamePlayFailure('No Data Found'))
    }
  }
}
