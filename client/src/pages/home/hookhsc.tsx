import React from 'react';
import { withHooksHOC } from './hoc';

interface IHooksHOCProps {
  width: number;
}

class HooksHOC extends React.Component<IHooksHOCProps> {
  render() {
    return <p style={{ fontSize: '48px' }}>width: {this.props.width}</p>;
  }
}

export default withHooksHOC(HooksHOC);