import React from 'react'
import { Result, Button, Modal } from 'antd'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './gamemodal.scss'
interface Props {
  visible: boolean
  mstatus: string // message status
  title: string
  subtitle: string
  playagain(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  replay(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}
const GameModal = (state: Props) =>
  state.visible
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal-wrapper">
              <Result
                key="result_modal"
                status={state.mstatus === 'success' ? 'success' : 'info'}
                title={state.title}
                subTitle={state.subtitle}
                extra={[
                  <Button
                    id={`${state.mstatus}play_again`}
                    type="primary"
                    key="play_again"
                    onClick={state.playagain}
                  >
                    Play Again
                  </Button>,
                  <Button
                    id={`${state.mstatus}replay`}
                    type="primary"
                    key="replay"
                    onClick={state.replay}
                  >
                    RePlay
                  </Button>,
                  <Link key="history" to="/history">
                    View History
                  </Link>,
                ]}
              />
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null
export default GameModal
