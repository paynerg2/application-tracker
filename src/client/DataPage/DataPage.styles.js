import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 60% 30%;
    grid-template-rows: auto auto;

    @media (max-width: 1200px) {
        display: flex;
        flex-direction: column;
    }
`;
Container.displayName = 'Container';

export const Data = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 30px;
    margin: 20px;
    border: solid 1px rgba(0, 0, 0, 0.0975);
    border-radius: 3px;
`;
Data.displayName = 'Data';

export const TextData = styled.div`
    margin: 20px;
`;
TextData.displayName = 'TextData';

export const TextDataHeader = styled.div`
    background-color: #1995ad;
    color: white;
    font-size: 1.6em;
    text-align: center;
    font-style: bold;
`;

export const AllTimeData = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: solid 1px rgba(0, 0, 0, 0.0975);
    border-radius: 3px;
    margin-bottom: 10px;
`;
AllTimeData.displayName = 'AllTimeData';

export const SixMonthsData = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px rgba(0, 0, 0, 0.0975);
    border-radius: 3px;
`;
SixMonthsData.displayName = 'SixMonthsData';

export const TextHeader = styled.h4`
    padding-inline-start: 40px;
`;
TextHeader.displayName = 'TextHeader';

export const CompanyContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;
CompanyContainer.displayName = 'CompanyContainer';

export const Company = styled.li`
    list-style: none;
    background-color: rgba(161, 214, 226, 0.975);
    color: white;
    border-radius: 4px;
    margin: 3px;
    padding: 5px;
`;
Company.displayName = 'Company';
