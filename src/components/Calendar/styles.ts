import styled from 'styled-components';

export const Container = styled.div`
padding: 40px;
  ul{
    list-style:none;
  }
`;

export const ColumCalendar = styled.ul`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  
  li{
    border:solid 1px #ccc;
    height: 90px;
    padding: 10px;
    :nth-child(1), :nth-child(7){
      background-color:#ecf0f1;
      span{
        color:#3498db;
      }
    }
    :hover{
      background-color:#ededed;
    }
    
  }
`;

export const DaysOfWeek = styled.ul`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  li{
      background-color:#3498db;
      color:white;
      font-weight:bold;
      text-align: center;      
    }
`;

export const DayNumber = styled.span`
  font-weight:bold;
`;

export const DayOutMonth = styled.span`
  color:#afafaf!important;
  font-weight:bold;
  
`;

export const CalendarControl = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    button{
      padding: 10px 16px;
      width: 130px;
      background: #3498db;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 7px;
    }
`;

export const NewEvent = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 470px;
    padding: 20px 10px;
    .eventField{
      width: 100%;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .MuiFormControl-root{
      width: 100%;
    }
    
`;


export const ButtonReminderAction = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

export const ColorField = styled.div`
    display: flex;
    align-items: center;
    span{
      margin-right: 15px;
    }
`;

export const TitleReminder = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h3{
      margin-right: 12px;
    }
`;