/**
 * @GameHistory shows the game history or game plays
 **/

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGamePlays } from '../../redux/gamePlay/list/api'
import GamePlays from '../../components/gameplays'
import { Link } from 'react-router-dom'

const GameHistory: React.FC = () => {
  // Define the columsn for the Table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Player 1',
      dataIndex: 'player1',
      key: 'player1',
    },
    {
      title: 'Player 2',
      dataIndex: 'player2',
      key: 'player2',
    },
    {
      title: 'Winner',
      dataIndex: 'winner',
      key: 'winner',
    },
    {
      title: 'Status',
      dataIndex: 'draw',
      key: 'draw',
      // Show the custom value in Table Grid. Render functions call every time when a new row is added to the table
      // Show text Draw || Won
      render: (text: boolean, record: any) => (text ? 'Draw' : 'Won'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // Show the custom value in Table Grid. Render functions call every time when a new row is added to the table
      // Create the Replay Game Link
      render: (text: string, record: any) => <Link to={`/replay/${record.id}`}>Replay Game</Link>,
    },
  ]
  // load the state from redux-thunk
  const state: any = useSelector((state: any) => state.gameplay.list)
  // load the dispatcher from redux-thunk
  const dispatch = useDispatch()
  useEffect(() => {
    // load game history
    dispatch(getGamePlays())
  }, [dispatch])
  return (
    <React.Fragment>
      {state.fetching === false ? (
        state.error === null ? (
          <GamePlays
            data={state.data}
            cloumns={columns}
          /> /* Pass @columns and @data to @GamePlays */
        ) : (
          <div className="errorMsg">{state.error}</div>
        )
      ) : (
        <div>Loading</div>
      )}
    </React.Fragment>
  )
}
export { GameHistory }
export default GameHistory
