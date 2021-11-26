import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useGetApplicationsQuery } from './services/api';
import mobileBackground from './assets/Background_mobile.png';
import desktopBackground from './assets/Background_desktop.png';
import Login from './pages/Login/Login';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Signup from './pages/Signup/Signup';
import ContactCard from './components/Cards/Contact/contactCard';
import InterviewCard from './components/Cards/Interview/interviewCard';
import ApplicationItem from './components/Cards/Application/applicationItem';
import { List } from './components/List/list';
import NotFound from './pages/404/404';

const Container = styled.div`
    min-height: 100vh;
    min-width: 100%;
    background-image: url(${mobileBackground});
    background-size: cover;
    box-sizing: border-box;

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        background-image: url(${desktopBackground});
    }
`;

function App() {
    // const { data, error, isLoading } = useGetApplicationsQuery();

    // if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Container>
                <Header />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
                <Footer />
            </Container>
        </>
    );
}

export default App;
