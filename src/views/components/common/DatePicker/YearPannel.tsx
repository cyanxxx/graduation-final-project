import * as React from 'react';
interface Props {
  cur_year: number;
  choiceYear: any;
}
function createYear(year: number) {
  const years: number[] = [];
  for (let i = year - 10; i < year + 10; i++) {
    years.push(i);
  }
  return years;
}
export default function MonthPannel({ cur_year, choiceYear }: Props) {
  const years: number[] = createYear(cur_year);
  return (
    <div
      className="years"
      onClick={ev => {
        choiceYear(parseInt((ev.target as HTMLElement).textContent as string));
      }}
    >
      {years.map(el => {
        return (
          <div key={el} className={`tag ${cur_year === el ? ' is-primary' : ''}`}>
            {el}
          </div>
        );
      })}
    </div>
  );
}
