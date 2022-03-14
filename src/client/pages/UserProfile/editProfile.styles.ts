import styled from 'styled-components';
import Button from '../../components/Button/button';

export const Container = styled.div`
    width: 80vw;
    height: 100%;
    margin: 0 auto;
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${Button} {
        width: 50%;
    }
`;
