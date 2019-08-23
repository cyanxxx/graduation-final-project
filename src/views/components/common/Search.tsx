import React from 'react';
interface Props {
  handleChange: any;
}
interface State {
  value: string;
}
export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  public render() {
    return (
      <form
        className="search"
        onSubmit={event => {
          event.preventDefault();
          this.props.handleChange(this.state.value);
        }}
      >
        <p className="control has-icons-left">
          <input
            className="input is-small"
            type="search"
            placeholder="search"
            value={this.state.value}
            onChange={event => {
              this.setState({ value: event.target.value });
            }}
          />
          <span className="icon is-small is-left">
            <svg style={{ color: '#d4451d', width: '1em', height: '1em' }} aria-hidden="true">
              <use xlinkHref={`#icon-sousuo`}></use>
            </svg>
          </span>
        </p>
      </form>
    );
  }
}
