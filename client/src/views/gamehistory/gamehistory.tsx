import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGamePlays } from '../../redux/gamePlay/list/api'
import GamePlays from '../../components/gameplays'
import { Link } from 'react-router-dom'

const GameHistory: React.FC = () => {
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
      render: (text: boolean, record: any) => (text === true ? 'Draw' : 'Won'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any) => <Link to={`/replay/${record.id}`}>Replay Game</Link>,
    },
  ]
  const state: any = useSelector((state: any) => state.gameplay.list)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGamePlays())
  }, [dispatch])
  return (
    <React.Fragment>
      {console.log(state)}
      {state.fetching === false ? (
        <GamePlays data={state.data} cloumns={columns} />
      ) : (
        <div>Loading</div>
      )}
    </React.Fragment>
  )
}
export { GameHistory }
export default GameHistory
