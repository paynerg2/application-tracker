import styled from 'styled-components';

// ****************************************
// *              Styles
// ****************************************

// Form Container
//! Add media queries for responsivity.
export const FormContainer = styled.form`
    display: grid;
    justify-content: space-around;
    grid-template-columns: auto auto auto;
    background-color: white;
    font-family: 'Open Sans', sans-serif;
`;
FormContainer.displayName = 'FormContainer';

// H2 Text
export const H2Text = styled.h2`
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 4px;
    border-bottom: 2px solid #ddd;
    text-align: center;
    width: 220px;
`;
H2Text.displayName = 'H2Text';

// Form Group
export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`;
FormGroup.displayName = 'FormGroup';

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
Input.displayName = 'Input';

export const Checkbox = styled.input`
    width: 20px;
    border: none;
    outline: none;
`;

export const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

// Help Block
export const HelpBlock = styled.div`
    background: rgba(255, 0, 0, 0.5);
    border-radius: 4px;
    padding: 2px;
    margin: 2px;
    text-align: center;
`;
HelpBlock.displayName = 'HelpBlock';

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
Button.displayName = 'Button';

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
Column.displayName = 'Colummn';
