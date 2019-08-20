import * as React from 'react';
import WeekPannel from './WeekPannel';
import MonthPannel from './MonthPannel';
import YearPannel from './YearPannel';
import AlertBox from '../Alert';
import './date.scss';
import { compareDate } from '../../../../utils/date';

interface Props {
  dateHandle: any;
  render: boolean;
  start_day: string;
  end_day: string;
}
interface State {
  date: Date;
  activeDay: number;
  cur_month: number;
  cur_year: number;
  selectDay: string[];
  mode: number;
}
enum displayMode {
  year,
  month,
  date,
}
export default class DatePannel extends React.Component<Props, State> {
  alert: any;
  constructor(props: Props) {
    super(props);
    const date = new Date();
    this.state = {
      date: date,
      activeDay: date.getDate(),
      cur_month: date.getMonth(),
      cur_year: date.getFullYear(),
      selectDay: [],
      mode: displayMode.date,
    };
  }
  selectDate = (ev: Event) => {
    const target = ev.currentTarget as HTMLElement;
    let start_day, end_day;
    if (!this.props.start_day) {
      start_day = target.dataset.date;
    } else if (!this.props.end_day) {
      end_day = target.dataset.date;
      let fn = compareDate(this.props.start_day, end_day);
      fn.isVerse() ? (start_day = end_day) && (end_day = this.props.start_day) : null;
      if (fn.isOverflow()) {
        this.alert = new AlertBox({ message: '不能超过30天' });
        end_day = '';
      }
    } else {
      start_day = target.dataset.date;
      end_day = '';
    }
    this.forceUpdate();
    this.props.dateHandle(start_day, end_day);
  };
  changeMonth = (month: number, year: number) => {
    if (month < 0) {
      this.setState({ cur_year: year - 1, cur_month: 12 });
      return;
    }
    if (month > 12) {
      this.setState({ cur_year: year + 1, cur_month: 1 });
      return;
    }
    this.setState({ cur_month: month, mode: displayMode.date });
  };
  changeYear = (year: number) => {
    this.setState({ cur_year: year, mode: displayMode.date });
  };
  componentWillUnmount() {
    this.alert && this.alert.close();
  }
  render() {
    const { date, cur_month, cur_year, mode } = this.state;
    var pannl: JSX.Element;
    switch (mode) {
      case displayMode.year:
        pannl = <YearPannel cur_year={cur_year} choiceYear={this.changeYear}></YearPannel>;
        break;
      case displayMode.month:
        pannl = <MonthPannel cur_month={cur_month} choiceMonth={this.changeMonth}></MonthPannel>;
        break;
      default:
        pannl = (
          <WeekPannel
            cur_month={cur_month}
            cur_year={cur_year}
            today={date}
            choiceDay={this.selectDate}
            startDate={this.props.start_day}
            endDate={this.props.end_day}
          ></WeekPannel>
        );
        break;
    }
    return (
      this.props.render && (
        <div className="date" style={{ width: '100%' }}>
          <div className="header">
            <div onClick={() => this.changeYear(cur_year - 1)}>&lt;&lt;</div>
            <div onClick={() => this.changeMonth(cur_month - 1, cur_year)}>&lt;</div>
            <div>
              <span onClick={() => this.setState({ mode: displayMode.year })}>{cur_year}年</span>
              <span onClick={() => this.setState({ mode: displayMode.month })}>
                {cur_month + 1}月
              </span>
            </div>
            <div onClick={() => this.changeMonth(cur_month + 1, cur_year)}>&gt;</div>
            <div onClick={() => this.changeYear(cur_year + 1)}>&gt;&gt;</div>
          </div>
          <div className="body">{pannl}</div>
        </div>
      )
    );
  }
}
