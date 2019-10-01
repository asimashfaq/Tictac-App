import React from 'react'
import { Col, Button } from 'antd'
interface Props {
  id: string
  callback(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}
export type Ref = Button
const GameBox = React.memo(
  React.forwardRef<Ref, Props>((props, ref) => {
    return (
      <Col span={1} xl={8}>
        <Button ref={ref} key={props.id} id={props.id} onClick={props.callback}>
          -
        </Button>
      </Col>
    )
  })
)

export default GameBox
