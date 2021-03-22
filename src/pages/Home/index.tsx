import React, {useState} from 'react';
import { useCalendarMatrix } from '../../hooks/useCalendar'
import CalendarLayout from '../../components/Calendar'


// import { Container } from './styles';

const Home: React.FC = () => {
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(2021)
  let [matrix] = useCalendarMatrix(year, month)
  const NextMonth = () => {
    if(month === 11){
      setMonth(0);
      setYear(year + 1);
    }
    else{
      setMonth(month+1);
    }
  }
  const PreviousMonth = () => {
    if(month === 0){
      setMonth(11);
      setYear(year - 1);
    }
    else{
      setMonth(month-1);
    }
  }
  console.log(matrix)
  return (<div>
    <h1>Home Calendar</h1>
    <CalendarLayout matrix={matrix} month={month} year={year} nextMonth={NextMonth} previousMonth={PreviousMonth}/>
  </div>);
}

export default Home;