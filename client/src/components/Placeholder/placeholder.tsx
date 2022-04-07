import React from 'react';
import { Placeholder as StyledPlaceholder, Image, Header, Cta } from './placeholder.styles';

interface Props {
    image?: string;
    headerText: string;
    cta: string;
    [x: string]: any;
}

const Placeholder = ({ image, headerText, cta, ...rest }: Props) => {
    return (
        <StyledPlaceholder {...rest}>
            {image && <Image alt="Empty List" src={image} />}
            <div>
                <Header id="placeholder-header">{headerText}</Header>
                <Cta>{cta}</Cta>
            </div>
        </StyledPlaceholder>
    );
};

export default Placeholder;
