import React, { Component } from 'react';
import { Card } from '../../components/common/Card';
import Menu from '../../components/restaurant/menu';
import LoadMore from '../../components/common/LoadMore';
import NavItem from '../../mobile/restaurant/navItem';
import { componentProps } from '../../../config/route';

interface State {}
export default class Index extends Component<componentProps, State> {
  public render() {
    const { core } = this.props;
    return (
      <div>
        <Card>
          <Menu core={core} Item={NavItem} render={config => <LoadMore {...config}></LoadMore>} />
        </Card>
      </div>
    );
  }
}
