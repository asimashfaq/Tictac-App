import React from 'react'
import { Result, Button, Modal } from 'antd'
interface Props {
  visible: boolean
  mstatus: string // message status
  title: string
  subtitle: string
  playagain(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  replay(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}
const GameModal = (state: Props) => {
  return (
    <Modal title="" footer={[]} visible={state.visible}>
      <Result
        status={state.mstatus === 'success' ? 'success' : 'info'}
        title={state.title}
        subTitle={state.subtitle}
        extra={[
          <Button type="primary" key="play_again" onClick={state.playagain}>
            Play Again
          </Button>,
          <Button type="primary" key="replay" onClick={state.replay}>
            RePlay
          </Button>,
        ]}
      />
    </Modal>
  )
}
export default GameModal
