import React from 'react'
import { Table } from 'antd'
interface Props {
  cloumns: Array<any>
  data: Array<any>
}
const GamePlays = (props: Props) => {
  return (
    <React.Fragment>
      {props.data.length > 0 ? (
        <Table rowKey={record => record.id} dataSource={props.data} columns={props.cloumns} />
      ) : (
        <div className="msg">No data to load</div>
      )}
    </React.Fragment>
  )
}
export default GamePlays
