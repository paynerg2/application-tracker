import styled from 'styled-components';
import { ImageSection as DefaultImageSection } from '../../components/Form/form';

export const ImageSection = styled(DefaultImageSection)`
    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        padding: 5vmax;
        box-sizing: border-box;
    }
`;
