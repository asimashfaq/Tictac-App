import React from 'react'
import { Col, Button } from 'antd'
interface Props {
  id: string
  callback(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}
const GameBox = React.memo(React.forwardRef((props: Props,ref:any) => {
  return (
    <Col span={1} xl={8}>
      <Button key={props.id} ref={ref} id={props.id} onClick={props.callback}>
        -
      </Button>
    </Col>
  )
}))
export default GameBox
 