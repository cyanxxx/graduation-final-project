import React, { Component } from 'react';
import { Card } from '../../components/common/Card';
import Scenery from '../../components/scenery/item';
import { componentProps } from '../../../config/route';
interface State {}
export default class Index extends Component<componentProps, State> {
  constructor(props: componentProps) {
    super(props);
  }
  render() {
    return (
      <Card style={{ width: 1080, margin: '20px auto' }}>
        <Scenery core={this.props.core}></Scenery>
      </Card>
    );
  }
}
