/**
 * Components renders the Table that shows history of GamePlays
 * based on the @data coming through props from @API_CALL
 * @example ``` <GamePlays 
      data={[{id:1,player1:1}]}
      cloumns={[{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Player 1',
      dataIndex: 'player1',
      key: 'player1',
    }]} />
  ```
 */
import React from 'react'
import { Table } from 'antd'
/**
 * @columns Table column
 * @data Table data
 **/
interface Props {
  // tslint:disable-next-line: prefer-array-literal
  cloumns: Array<any>
  // tslint:disable-next-line: prefer-array-literal
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
