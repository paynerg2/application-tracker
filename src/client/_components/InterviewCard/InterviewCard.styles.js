import styled from 'styled-components';

export const DateDisplay = styled.div`
    display: flex;
    flex-direction: column;
    width: 90px;
    height: 115px;
    margin: 4px;
`;
DateDisplay.displayName = 'DateDisplay';

export const DateNumber = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    color: #1995ad;
    width: 100%;
    height: 50%;
    font-size: 25px;
    text-align: center;
`;
DateNumber.displayName = 'DateNumber';

export const Month = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #1995ad;
    color: #fff;
    text-align: center;
    height: 16.6%;
    width: 100%;
`;
Month.displayName = 'Month';

export const Time = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #1995ad;
    color: #fff;
    text-align: center;
    height: 16.6%;
    width: 100%;
`;
Time.displayName = 'Time';
