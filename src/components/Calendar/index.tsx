import React, {useState} from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale'
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputColor from 'react-input-color';
import InputMask from 'react-input-mask';

import { 
  Container, 
  ColumCalendar,
  DaysOfWeek,
  DayNumber,
  DayOutMonth,
  CalendarControl,
  NewEvent,
  ButtonReminderAction,
  ColorField,
  TitleReminder  
 } from './styles';

interface PropsCalendar{
  matrix: [],
  month: number,
  year: number, 
  nextMonth?: () => void,
  previousMonth?: () => void
}

const Calendar: React.FC<PropsCalendar> = ({ matrix, month, year, nextMonth, previousMonth }) => {
  const [drawer, setDrawer] = useState(false);
  const [color, setColor] = useState({});
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const handleToggle = () => {
    setDrawer(!drawer)
  }
  
  function addNewEvent(date:Date){
      setDrawer(true);
  }
  return (
    <Container>
      <CalendarControl>
        <div><button onClick={previousMonth} >Previous</button></div>
        <div><h2>{enUS.localize?.month(month)} - {year}</h2></div>
        <div><button onClick={nextMonth}>Next</button></div>
      </CalendarControl>
      
      <DaysOfWeek>
          <li>Sunday</li>
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
          <li>Saturday</li>    
     </DaysOfWeek>
      <ul>    
        {matrix.map((week: any, index: number) => (
          <ColumCalendar>          
            {week.map((day: any, i: number) => (
              <li key={`${index-i}`} onClick={() => {addNewEvent(day); setSelectDate(day)}}>
                {day.getMonth() === month ? 
                (<DayNumber>{format(day, 'dd')}</DayNumber>) : 
                (<DayOutMonth>{format(day, 'dd')}</DayOutMonth>)}
                
              </li>
            ))}
          </ColumCalendar>
        ))}
      </ul>
     
      <Drawer open={drawer} onClose={handleToggle} anchor="right">
        <NewEvent>
          <TitleReminder>
            <h3>Add a new reminder</h3>
            <span>To {selectDate ? format(selectDate, 'dd/MM/yyyy') : null}</span>
          </TitleReminder>
          
          <ColorField className="eventField">
            <span>Select color for reminder</span>
            <InputColor
              initialValue="#5e72e4"
              onChange={setColor}
              placement="right"
            />
          </ColorField>
          <div className="eventField">
            <TextField id="outlined-basic" label="City name" variant="outlined" />
          </div>
          <div className="eventField">
            <TextField id="outlined-basic" label="Title" variant="outlined" />
          </div>
          <div className="eventField">
            <TextField
              id="outlined-multiline-static"
              label="Text Reminder"
              multiline
              rows={4}            
              variant="outlined"
            />
          </div>
          <div className="eventField">
          <TextField
              id="time"
              label="Time reminder"
              type="time"
              defaultValue="07:30"        
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </div>
          <div className="eventField">
          <InputMask mask="99/99/9999" placeholder="Date dd/mm/yyyy" />
          </div>
          <ButtonReminderAction>
            <Button variant="contained" color="primary">
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleToggle}>
              Close
            </Button>
          </ButtonReminderAction>
        </NewEvent>        
      </Drawer>
    </Container>
  );
}

export default Calendar;