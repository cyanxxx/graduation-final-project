import * as React from 'react';
interface Props {
    cur_month: number,
    choiceDay: any,
    cur_year: number,
    today: Date,
    startDate?: string,
    endDate?: string
}
enum DAY_STATUS { 'NORMAL', 'START', 'ACTIVE', 'END', 'CURRENT', 'DURING',}
const classname_status = ['', 'start', 'active', 'end', 'current', 'during']
interface day{
    val: number,
    status: DAY_STATUS
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
    return dayArr
}
function createLastDayArr(day: number, totalDay: number){
    let dayArr: number[] = []
    let limitDay = 1, i = 1
    if (day > limitDay) {
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
function toNumberDay(str){
    return  str.split('-').map((el)=>parseInt(el))
}
function renderDayDom(year:number,month: number, dayArr: day[],fn:any){
    return dayArr.map((el)=>{
        return <div data-date={`${year}-${month + 1}-${el.val}`} key={el.val} onClick={fn}
            className={classname_status[el.status]}
        >
            <button>{el.val}</button>
        </div>
    })
}
function renderDayArr(totalDay: number, params:any,mode:string){
    let dayArr:day[] = []
    var _stages:string[]=[]
    
    var stage = {
        start(i: number) {
            if (params.start_day === i) {
                return DAY_STATUS.START
            }else{
                return DAY_STATUS.NORMAL
            }
        },
        end(i: number) {
            if (params.end_day === i) {
                return DAY_STATUS.END
            }else{
                return DAY_STATUS.NORMAL
            }
        },
        during(i) {
            if (i >= params.start_day && i <= params.end_day){
                return DAY_STATUS.DURING
            } else {
                return DAY_STATUS.NORMAL
            }
            
        },
        normal() {
            return DAY_STATUS.NORMAL
        },
    }
    addStage()
    function addStage(){
        let arr = mode.split('|')
        _stages.push(...arr)
    }
    function handleStage(i) {
        return _stages.reduce((prev, cur) => prev || stage[cur](i),DAY_STATUS.NORMAL)
    }
    for (let i = 1; i <= totalDay; i++) {
        let item:day = {
            val: i,
            status: handleStage(i)
        }
        dayArr.push(item)
    }
    return dayArr 
}
function renderDay(totalDay: number, year: number, month: number,today: Date,fn:()=>{}, startDate?: string, endDate?: string) {
    let start_year, start_month, start_day, end_year, end_month, end_day;
    let dayArr: day[] = []
    if (startDate){
        [start_year, start_month, start_day] = toNumberDay(startDate)

    }
    if (endDate) {
        [end_year, end_month, end_day] = toNumberDay(endDate)
    }
    if (!startDate && !endDate || start_year != year) {
        dayArr = renderDayArr(totalDay, {}, 'normal')
    } else if (startDate && endDate){
        //跨月
        if (end_month > start_month) {
            if (month + 1 == start_month) {
                dayArr = renderDayArr(totalDay, { start_day, end_day:totalDay }, 'start|during')
            }
            else if (month + 1 > start_month && month + 1 < end_month) {
                dayArr = renderDayArr(totalDay, { start_day, end_day: totalDay}, 'during')
            }
            else if (month + 1 == end_month) {
                dayArr = renderDayArr(totalDay, { start_day:1,end_day }, 'end|during')
            }
        } else if (end_month === start_month && month + 1 === start_month) {
            dayArr = renderDayArr(totalDay, { start_day, end_day }, 'start|end|during')
        } else {
            dayArr = renderDayArr(totalDay, {}, 'normal')
        }
    }else{
        if (start_month === month + 1) {
            dayArr = renderDayArr(totalDay, { start_day }, 'start')
        } else {
            dayArr = renderDayArr(totalDay, {}, 'normal')
        }
    }
    //开始天 
    return renderDayDom(year,month,dayArr,fn)
}
const weekday = ['一', '二', '三', '四', '五', '六','日']
export default function WeekhPannel({ cur_month, cur_year, today, choiceDay, startDate, endDate }: Props) {

    const tmpDate = new Date()
    tmpDate.setFullYear(cur_year)
    tmpDate.setMonth(cur_month)
    const totalDay = getTotalDay(tmpDate,cur_month)     //  这个月的总天数

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
                return <div className='invalid' key={el}>{el}</div>
            })}
            {
                renderDay(totalDay, cur_year, cur_month, today, choiceDay, startDate, endDate)
            }
            {nextDay.map((el) => {
                return <div className='invalid' key={el}>{el}</div>
            })}
        </div>
    )
}