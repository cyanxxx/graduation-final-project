import React, { Component } from 'react';
import { Core } from '../../../core/index';
import { getOffset } from '../../../utils/getOffset';
interface Props {
  curPage: number;
  core: Core;
  getDataHandle: any;
  hasNext: boolean;
}
interface States {}
export default class LoadMore extends Component<Props, States> {
  public contentBottom: HTMLDivElement | null;
  constructor(props: Props) {
    super(props);
    this.contentBottom = null;
  }
  public componentDidMount() {
    // this.props.core.windowSlideDownEvent.sub(() => {
    //   this.reachBottom()
    // })
    this.props.core.windowScrollEvent.sub(() => {
      this.reachBottom();
    });
  }
  public componentWillUnmount() {
    // this.props.core.windowSlideDownEvent.unsub(() => {
    //   this.reachBottom()
    // })
    this.props.core.windowScrollEvent.unsub(() => {
      this.reachBottom();
    });
  }
  public reachBottom() {
    const { getDataHandle, curPage, hasNext } = this.props;
    if (!hasNext) {
      // this.props.core.windowSlideDownEvent.unsub(() => {
      //   this.reachBottom()
      // })
      this.props.core.windowScrollEvent.unsub(() => {
        this.reachBottom();
      });
      return;
    }

    console.log(getOffset(this.contentBottom!).top, window.innerHeight, window.pageYOffset);
    if (
      this.contentBottom &&
      getOffset(this.contentBottom!).top < window.innerHeight + window.pageYOffset
    ) {
      getDataHandle(curPage + 1);
    }
  }
  public render() {
    return <div className="line" ref={bottom => (this.contentBottom = bottom)}></div>;
  }
}
