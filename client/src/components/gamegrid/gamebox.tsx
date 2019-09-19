import React from 'react'
import { Col, Button } from 'antd'
interface Props {
  id: string
  buttondisable: boolean
  callback(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}
const GameBox = React.memo((props: Props) => {
  return (
    <Col span={1} xl={8}>
      <Button id={props.id} onClick={props.callback} disabled={props.buttondisable}>
        -
      </Button>
    </Col>
  )
})
export default GameBox
