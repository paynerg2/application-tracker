import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useGetApplicationsQuery } from './services/api';
import mobileBackground from './assets/Background_mobile.png';
import desktopBackground from './assets/BG.png';
import ScrollToTop from './common/ScrollToTop/scrollToTop';
import Login from './pages/Login/Login';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Signup from './pages/Signup/Signup';
import ContactCard from './components/Cards/Contact/contactCard';
import InterviewCard from './components/Cards/Interview/interviewCard';
import ApplicationItem from './components/Cards/Application/applicationItem';
import { List } from './components/List/list';
import NotFound from './pages/404/404';
import LandingPage from './pages/Landing/Landing';
import Test from './pages/Test/Test';

const Container = styled.div`
    min-height: 100vh;
    min-width: 100%;
    background-image: url(${mobileBackground});
    background-size: contain;
    background-repeat: no-repeat;
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
            <BrowserRouter>
                <Container>
                    <Header />
                    <ScrollToTop />
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/404" component={NotFound} />
                        <Route path="/testing" component={Test} />
                        <Redirect to="/404" />
                    </Switch>
                    <Footer />
                </Container>
            </BrowserRouter>
        </>
    );
}

export default App;
