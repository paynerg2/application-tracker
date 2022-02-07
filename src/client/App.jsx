import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import mobileBackground from './assets/Background_mobile.png';
import desktopBackground from './assets/BG.png';
import ScrollToTop from './common/ScrollToTop/scrollToTop';
import Login from './pages/Login/Login';
import Applications from './pages/Applications/Applications';
import Application from './pages/Applications/Application';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/404/404';
import LandingPage from './pages/Landing/Landing';
import NewApplication from './pages/NewApplication/NewApplication';
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
                        <Route exact path="/applications" component={Applications} />
                        <Route path="/applications/new/:step" component={NewApplication} />
                        <Route exact path="/applications/:id" component={Application} />
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
