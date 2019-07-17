import styled from 'styled-components';

// ****************************************
// *              Styles
// ****************************************

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Form Container
export const FormContainer = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-family: 'Open Sans', sans-serif;
`;
FormContainer.displayName = 'FormContainer';

// H2 Text
export const H2Text = styled.h2`
    margin: 20px auto;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 4px;
    border-bottom: 2px solid #ddd;
    text-align: center;
    width: 300px;
`;
H2Text.displayName = 'H2Text';

// Form Group
export const FormGroup = styled.div`
    width: 300px;
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

/* padding +.6px to account for difference in
   select and input heights
 */
export const SelectInput = styled.select`
    width: 100%;
    margin-top: 2px;
    border-radius: 4px;
    border: 1px solid #c2c2c2;
    padding: 7.6px;
    box-shadow: 1px 1px 4px #ebebeb;
    outline: none;
`;

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

export const MultiCheckbox = styled.div`
    width: 300px;
    margin-bottom: 3px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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

export const ButtonContainer = styled.div`
    margin-top: 20px;
`;
ButtonContainer.displayName = 'ButtonContainer';

// Primary Button
export const Button = styled.button`
    border: none;
    padding: 4px 7px 4px 7px;
    background: #1995ad;
    color: #fff;
    margin-top: 5px;
    box-shadow: 1px 1px 4px #dadada;
    border-radius: 4px;
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
