import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NotFoundImage from '../../assets/Not_Found.svg';
import Button from '../../components/Button/button';

const Background = styled.div`
    height: 90vh;
    width: 100%;
    background: linear-gradient(
        to bottom,
        transparent 40%,
        ${(props) => props.theme.color.primaryBlue} 40%
    );

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 8vh;
`;

const Text = styled.p`
    font-size: 2rem;
    color: ${(props) => props.theme.color.white};
    text-align: center;
`;

function NotFound() {
    return (
        <Background>
            <img
                style={{ height: 'auto', width: '100%', maxWidth: '700px' }}
                src={NotFoundImage}
                alt="Page Not Found"
            />
            <Text>
                <strong>We can't find the content you were looking for.</strong>
            </Text>
            <Link to="/" style={{ width: '50vw' }}>
                <Button style={{ maxWidth: '400px', margin: '0 auto' }} inverted={true}>
                    Get Back to Your Job Hunt
                </Button>
            </Link>
        </Background>
    );
}

export default NotFound;
