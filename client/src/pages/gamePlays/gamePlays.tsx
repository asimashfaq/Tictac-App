import React, { useEffect } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchList } from '../../redux/reducers/gamePlays/api'

const History = () => {
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
  const state = useSelector((state: any) => state.gameplaylist)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])
  return (
    <div>
      {state.fetching === false ? (
        <Table rowKey={record => record.id} dataSource={state.data} columns={columns} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default History
