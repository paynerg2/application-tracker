import styled from 'styled-components';

// ****************************************
// *              Styles
// ****************************************

// Form Container
export const FormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
`;
// H2 Text
export const H2Text = styled.h2`
    font: 20px Arial, Helvetica, sans-serif;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 4px;
    border-bottom: 2px solid #ddd;
    text-align: center;
    width: 220px;
`;

// Form Group
export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`;

// Input
export const Input = styled.input`
    width: 100%;
    border-radius: 4px;
    border: 1px solid #c2c2c2;
    border-style: border-box;
    padding: 7px;
    box-shadow: 1px 1px 4px #ebebeb;
    outline: none;
`;

// Help Block
export const HelpBlock = styled.div``;

// Primary Button
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
    }
`;
