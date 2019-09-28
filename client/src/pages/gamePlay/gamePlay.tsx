import React, { useEffect } from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { getGamePlay } from '../../redux/reducers/gamePlays/api'
import GameBox from '../../components/gamegrid/gamebox'
import './gamePlay.scss'
const { Text } = Typography
const GamePlay = ({ match }: any) => {
  const sState = useSelector((state: any) => state.gameplaylist)
  const { gameplay } = sState
  const boxRefs:any =[]
  const sdispatch = useDispatch()
  useEffect(() => {
    sdispatch(getGamePlay(match.params.id))
  }, [sdispatch])
  const items = []
  // tslint:disable-next-line: no-increment-decrement
  for (let i = 0; i < 9; i++) {
    items.push(<GameBox
      ref={(input:any)=>{boxRefs[i] = input}}
      key={`box${i}`} id={`box${i}`} callback={() => {}} />)
  }
  if (!sState.fetching) {
    setTimeout(() => {
      gameplay.boxes.forEach((box: Box) => {
        const element: HTMLElement | null = document.getElementById(`${box.id}`)!
        element.innerHTML = `<span>${box.value}</span>`
      })
    }, 1000)
  }
  return (
    <div>
      {sState.fetching === false ? (
        <Layout className="gamegrid">
          <Layout style={{ background: '#ECECEC', padding: '30px' }} />
          <Row>
            <Col span={8}>
              <Card title="Player 1" bordered={false}>
                {gameplay.player1}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Winner Turn" bordered={false}>
                <Text className="playerturn">Player {gameplay.winner}</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Player 2" bordered={false}>
                {gameplay.player2}
              </Card>
            </Col>
          </Row>
          <Row>{items}</Row>
        </Layout>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default GamePlay
