import React from 'react'
import { Result, Button, Modal } from 'antd'
import { Link } from 'react-router-dom'
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
        key="result_modal"
        status={state.mstatus === 'success' ? 'success' : 'info'}
        title={state.title}
        subTitle={state.subtitle}
        extra={[
          <Button id="play_again" type="primary" key="play_again" onClick={state.playagain}>
            Play Again
          </Button>,
          <Button id="replay" type="primary" key="replay" onClick={state.replay}>
            RePlay
          </Button>,
          <Link key="history" to="/history">
            View History
          </Link>,
        ]}
      />
    </Modal>
  )
}
export default GameModal
