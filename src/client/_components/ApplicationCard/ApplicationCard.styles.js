import styled from 'styled-components';

import { Button } from '../Card.styles';

export const RightColumn = styled.div`
    display: grid;
    grid-template-rows: 30% 30% 30%;
    justify-items: center;
    align-items: center;
    align-content: space-between;
`;
RightColumn.displayName = 'RightColumn';

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
LeftColumn.displayName = 'LeftColumn';

export const Bottom = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
`;
Bottom.displayName = 'Bottom';

export const Title = styled.div`
    font-weight: bold;
    border-bottom: solid 1px rgba(0, 0, 0, 0.0975);
`;
Title.displayName = 'Title';

export const Location = styled.div`
    font-style: italic;
`;
Location.displayName = 'Location';

export const UpdateButton = styled(Button)`
    box-shadow: 1px 2px 6px 1px darkgrey;
`;
UpdateButton.displayName = 'UpdateButton';
