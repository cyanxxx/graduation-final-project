import * as React from 'react';
interface Props {
    cur_month: number,
    choiceDay: any,
    cur_year: number,
    today: Date
}
function getTotalDay(lastMonthDate: Date,month: number){
    lastMonthDate.setMonth(month + 1)
    lastMonthDate.setDate(0)
    const totalDay = lastMonthDate.getDate()
    return totalDay
}
function getLastDay(lastMonthDate:Date){
    lastMonthDate.setDate(1)
    return lastMonthDate.getDay()
}
function getNextDay(lastMonthDate:Date){
    return lastMonthDate.getDay()
}
function createDayArr(day: number) {
    let dayArr: number[] = []
    let limitDay = 6
    
    if (day <= limitDay && day !== 0) {
        let rest = Math.abs(limitDay + 1 - day) //3
        let i = 1
        while (i <= rest) {
            dayArr.push(i)
            i++
        }
    }
    console.log(dayArr)
    return dayArr
}
function createLastDayArr(day: number, totalDay: number){
    let dayArr: number[] = []
    let limitDay = 1, i = 1
    if (day > limitDay) {
        console.log(day, totalDay)
        let rest = Math.abs(limitDay - day)
        let lastDay = totalDay
        while (i <= rest) {
            dayArr.unshift(lastDay)
            lastDay--
            i++
        }
    }
    return dayArr
}
function renderDay(totalDay: number, year: number, month: number,today: Date,fn:()=>{}) {
   
    let jsxElement: JSX.Element[] = []
    for (let i = 0; i < totalDay; i++) {

        jsxElement.push(<div data-date={`${year}-${month + 1}-${i + 1}`} key={i + 1} onClick={fn} className={`tag ${i + 1 === today.getDate() ? 'is-info' : 'is-white'}`}>{i + 1}</div>)
    } 
    return jsxElement
}
const weekday = ['一', '二', '三', '四', '五', '六','日']
export default function WeekhPannel({ cur_month, cur_year, today, choiceDay }: Props) {
    const tmpDate = new Date()
    tmpDate.setFullYear(cur_year)
    tmpDate.setMonth(cur_month)
    const totalDay = getTotalDay(tmpDate,cur_month)
    const nextDay: number[] = createDayArr(getNextDay(tmpDate))
    const lastDay: number[] = createLastDayArr(getLastDay(tmpDate), getTotalDay(tmpDate,cur_month - 1))
           
    return (
        <div className="week">
            {
                weekday.map((el) => {
                    return <div className="center" key={el}>{el}</div>
                })
            }
            {lastDay.map((el) => {
                return <div className="tag" key={el}>{el}</div>
            })}
            {
                renderDay(totalDay, cur_year, cur_month,today,choiceDay)
            }
            {nextDay.map((el) => {
                return <div className="tag" key={el}>{el}</div>
            })}
        </div>
    )
}