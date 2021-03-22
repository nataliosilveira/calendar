import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputColor from 'react-input-color';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import { createReminder } from '../../redux/ducks/calendar';

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
  TitleReminder,
  DateForm,
  CardReminder,
} from './styles';

interface PropsCalendar {
  matrix: [];
  month: number;
  year: number;
  nextMonth?: () => void;
  previousMonth?: () => void;
}

interface ReduxCalendar {
  calendar?: {
    reminders?: string;
  };
}

const Calendar: React.FC<PropsCalendar> = ({
  matrix,
  month,
  year,
  nextMonth,
  previousMonth,
}) => {
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [color, setColor] = useState({});
  const [selectDate, setSelectDate] = useState<string>('');
  const [city, setCity] = useState<null | string>(null);
  const [title, setTitle] = useState<null | string>(null);
  const [textField, setTextField] = useState<null | string>(null);
  const [hour, setHour] = useState<null | string>(null);
  const [selectedDay, setSelectedDay] = useState<null | Date>(null);
  const [index, setIndex] = useState<null | number>(null);
  const calendar: any = useSelector<ReduxCalendar>((state) => state.calendar);

  const handleToggle = () => {
    setDrawer(!drawer);
  };

  function addNewEvent(date: Date) {
    setDrawer(true);
    setSelectedDay(date);
  }

  useEffect(() => {
    console.log('valor do store');
    console.log(calendar.reminders);
  }, []);

  function handleCreateReminder() {
    let tempcalendar = [];
    tempcalendar.push(...calendar.reminders, {
      title: title,
      city: city,
      textField: textField,
      time: hour,
      dateTime: selectedDay,
      color: color,
    });
    dispatch(createReminder(tempcalendar));
    setDrawer(false);
  }

  function handleUpdateReminder() {
    let tempcalendar = [];
    tempcalendar.push(...calendar.reminders, {
      title: title,
      city: city,
      textField: textField,
      time: hour,
      dateTime: selectedDay,
      color: color,
    });
    dispatch(createReminder(tempcalendar));
    setDrawer(false);
  }

  return (
    <Container>
      <CalendarControl>
        <div>
          <button onClick={previousMonth}>Previous</button>
        </div>
        <div>
          <h2>
            {enUS.localize?.month(month)} - {year}
          </h2>
        </div>
        <div>
          <button onClick={nextMonth}>Next</button>
        </div>
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
              <li
                key={`${index - i}`}
                onClick={() => {
                  addNewEvent(day);
                  setSelectDate(format(day, 'dd/MM/yyyy'));
                }}
              >
                {day.getMonth() === month ? (
                  <DayNumber>{format(day, 'dd')}</DayNumber>
                ) : (
                  <DayOutMonth>{format(day, 'dd')}</DayOutMonth>
                )}
                {calendar.reminders.map((field: any, idx: number) => {
                  console.log(
                    'data',
                    format(new Date(field.dateTime), 'dd/MM/yyy'),
                    'dia',
                    format(day, 'dd/MM/yyy')
                  );
                  if (
                    format(new Date(field.dateTime), 'dd/MM/yyy') ===
                    format(day, 'dd/MM/yyy')
                  ) {
                    return (
                      <CardReminder
                        color={field.color.hex}
                        onClick={() => {
                          setDrawer(true);
                          setIndex(idx);
                        }}
                      >
                        {field.title}
                      </CardReminder>
                    );
                  }
                })}
              </li>
            ))}
          </ColumCalendar>
        ))}
      </ul>

      <Drawer open={drawer} onClose={handleToggle} anchor="right">
        <NewEvent>
          <TitleReminder>
            <h3>Add a new reminder</h3>
            <span>To {selectDate}</span>
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
            <TextField
              id="outlined-basic"
              label="City name"
              variant="outlined"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="eventField">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="eventField">
            <TextField
              id="outlined-multiline-static"
              label="Text Reminder"
              multiline
              rows={4}
              variant="outlined"
              value={textField}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setTextField(e.target.value);
                }
              }}
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
              onChange={(e) => {
                setHour(e.target.value);
              }}
              value={hour}
            />
          </div>
          <DateForm className="eventField">
            <InputMask
              mask="99/99/9999"
              placeholder="Date dd/mm/yyyy"
              value={selectDate}
              onChange={(e) => {
                setSelectDate(e.target.value);
              }}
            />
          </DateForm>
          <ButtonReminderAction>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleCreateReminder();
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleToggle}
            >
              Close
            </Button>
          </ButtonReminderAction>
        </NewEvent>
      </Drawer>
    </Container>
  );
};

export default Calendar;
