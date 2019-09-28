import React, { useEffect, useCallback } from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { getGamePlay } from '../../redux/reducers/gamePlays/api'
import GameBox from '../../components/gamebox/gamebox'
import './gamePlay.scss'
const { Text } = Typography
const waitFor = (ms:any) => new Promise(r => setTimeout(r, ms))
const asyncForEach = async (array:any, callback:any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

let animateDelay = 800
const boxRefs:any =[]
const GamePlay = ({ match }: any) => {
  const sState = useSelector((state: any) => state.gameplaylist)
  const { gameplay } = sState
  const items = []
  const sdispatch = useDispatch()

  useEffect(() => {
    sdispatch(getGamePlay(match.params.id))
  }, [sdispatch,match])

  const animateGame = useCallback(() => {
    console.log(gameplay.boxes)
    return new Promise( async res => {

      await asyncForEach(gameplay.boxes,async (box: Box, index: number) => {
        updateBoxUI(box.id, box.value)
        if(index< gameplay.boxes.length -1 )
        {
          await waitFor(animateDelay)
        }
      })
      res()
    })
  }, [ gameplay.boxes])
  const updateBoxUI =  (boxId: string, boxValue: string) => {
    boxRefs[boxId].buttonNode.innerHTML  = `<span>${boxValue}</span>`
    boxRefs[boxId].buttonNode.disabled = true
  }
  useEffect(()=>{
   if(gameplay.boxes.length>0){
      animateGame().then(()=>{
        waitFor(500).then(() => {
          alert("Replay End")
        })
      })
    }
   
  },[gameplay.boxes, animateGame])

  // tslint:disable-next-line: no-increment-decrement
  for (let i = 0; i < 9; i++) {
    items.push(<GameBox
      ref={(input:any)=> { boxRefs[`box${i}`] = input}}
      key={`box${i}`} id={`box${i}`} callback={() => {}} />)
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
              <Card title="Winner" bordered={false}>
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
