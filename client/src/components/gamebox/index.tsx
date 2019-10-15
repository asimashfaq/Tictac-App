/**
 * @GameBox renders the box for @GameGrid
 * Respent the box in TicTacApp
 * @example  ``` <GameBox
        id={}
        ref={}
        callback={}
      /> ```
 **/

import React from 'react'
import { Col, Button } from 'antd'

/**
 * @id defines the Button's unique Id
 * @callback trigger on Button onClick event
 **/
interface Props {
  id: string
  callback(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

export type Ref = Button

// @memo used for reducing rendering of component
const GameBox = React.memo(
  // @forwardRef used for storing ref of child in Parent component
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
