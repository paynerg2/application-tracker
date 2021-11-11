import React from 'react';
import styled from 'styled-components';
import { useGetApplicationsQuery } from './services/api';
import mobileBackground from './assets/Background_mobile.png';
import desktopBackground from './assets/Background_desktop.png';
import Login from './pages/Login/Login';
import Header from './components/Header/header';

const Container = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    background-image: url(${mobileBackground});
    background-size: cover;

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        background-image: url(${desktopBackground});
    }
`;

function App() {
    const { data, error, isLoading } = useGetApplicationsQuery();

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Container>
                <Header />
                <Login />
            </Container>
        </>
    );
}

export default App;
