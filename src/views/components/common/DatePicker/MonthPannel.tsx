import * as React from 'react';
interface Props {
  cur_month: number;
  choiceMonth: any;
}
function createMonth() {
  const month: number[] = [];
  for (let i = 1; i <= 12; i++) {
    month.push(i);
  }
  return month;
}

export default function MonthPannel({ cur_month, choiceMonth }: Props) {
  const month: number[] = createMonth();
  return (
    <div
      className="months"
      onClick={ev => choiceMonth(parseInt((ev.target as HTMLElement).textContent as string) - 1)}
    >
      {month.map(el => {
        return (
          <div key={el} className={`tag ${cur_month + 1 === el ? ' is-primary' : ''}`}>
            {el}
          </div>
        );
      })}
    </div>
  );
}
