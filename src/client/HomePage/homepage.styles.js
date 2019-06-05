import styled from 'styled-components';

export const CardListItem = styled.li`
    /*Adust with media query */
    width: 30%;
    height: 20vh;
    background-color: #fff;
    list-style-type: none;
    margin: 10px;
`;

export const CardList = styled.ul`
    height: 100%;
    padding: 20px;
    background-color: #bcbabe;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    flex: 1;
    margin: 0;
`;

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Open Sans', sans-serif;
`;
