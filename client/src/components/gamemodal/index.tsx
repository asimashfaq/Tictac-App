/**
 * Components Renders Mdoal used in @GameGrid
 * Modal appears once game ends to give options RE_PLAY || SAVE || PLAY_AGAIN
 * @example ``` <GameModal
        key={'warning'}
        mstatus={'warning'}
        title={'Reply End'}
        subtitle={``}
        playagain={e => {}}
        replay={e => {}}
        visible={state.replyModalVisible}
      /> ```
 */
import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './gamemodal.scss'

/**
 * @visible Show or Hide the Modal
 * @mstatus Message status
 * @title Modal Title
 * @subtitle Modal Subtitle
 * @playagin trigger on Button onClick event
 * @replay trigger on Button onClick event
 **/
interface Props {
  visible: boolean
  mstatus: string
  title: string
  subtitle: string
  playagain(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  replay(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const GameModal = (state: Props) =>
  state.visible
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="modal-overlay"
            aria-modal={true}
            aria-hidden={true}
            tabIndex={-1}
            role="dialog"
          >
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
