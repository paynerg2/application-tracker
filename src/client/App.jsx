import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import mobileBackground from './assets/Background_mobile.png';
import desktopBackground from './assets/BG.png';
import ScrollToTop from './common/ScrollToTop/scrollToTop';
import Login from './pages/Login/Login';
import Applications from './pages/Applications/Applications';
import Application from './pages/Applications/Application';
import Interviews from './pages/Interviews/Interviews';
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
    return (
        <>
            <Container>
                <Header />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="applications">
                        <Route index element={<Applications />} />
                        <Route path="new" element={<NewApplication />} />
                        <Route path=":id" element={<Application />} />
                        <Route path="edit/:step" element={<NewApplication />} />
                    </Route>
                    <Route path="interviews" element={<Interviews />} />
                    <Route path="404" element={<NotFound />} />
                    <Route path="testing" element={<Test />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Container>
        </>
    );
}

export default App;
