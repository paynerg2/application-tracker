import styled from 'styled-components';

export const CardListItem = styled.li`
    /*Adust with media query */
    width: 30%;
    height: 25vh;
    padding: 15px;
    font-family: 'Open Sans', sans-serif;
    font-size: 13px;
    background-color: #f1f1f2;
    list-style-type: none;
    margin: 10px;
    display: grid;
    grid-template-columns: 66% auto;
    box-shadow: 1px 2px 6px 1px darkgrey;
    border-radius: 1%;
    transition: box-shadow 0.2s ease-in;

    &:hover {
        box-shadow: 1px 2px 6px 1px #a1d6e2;
    }
`;
CardListItem.displayName = 'CardListItem';

export const Button = styled.button`
    border: none;
    padding: 4px 7px 4px 7px;
    background: #1995ad;
    color: #fff;
    margin-top: 5px;
    box-shadow: 1px 1px 4px #dadada;
    border-radius: 1%;
    font-family: 8px Arial, Helvetica, sans-serif;

    &:hover {
        background: #a1d6e2;
        color: #fff;
        transition: background-color 0.2s linear;
    }
`;
Button.displayName = 'Button';

export const Dropdown = styled.select`
    border: none;
    width: 100px;
`;
Dropdown.displayName = 'Dropdown';
