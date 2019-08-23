import React, { Component } from 'react';
import Page from '../../components/common/Page';
import { Card } from '../../components/common/Card';
import { Core } from '../../../core';
import Menu from '../../components/restaurant/menu';
import NavBox from '../../components/restaurant/navBox';
import { componentProps } from '../../../config/route';

interface Props {
  core: Core;
}
interface State {}
export default class Restaurant extends Component<componentProps, State> {
  constructor(props: componentProps) {
    super(props);
  }
  public render() {
    const core = this.props.core;
    return (
      <Card style={{ margin: '20px auto' }}>
        <Menu core={core} Item={NavBox} render={config => <Page {...config}></Page>} />
      </Card>
    );
  }
}
