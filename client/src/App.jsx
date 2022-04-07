import React from 'react';
import styled from 'styled-components';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import ContactForm from './pages/Forms/Contact/ContactForm';
import InterviewForm from './pages/Forms/Interview/InterviewForm';
import EditProfile from './pages/UserProfile/EditProfile';
import RequireAuth from './components/RequireAuth/requireAuth';
import Stats from './pages/Stats/Stats';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from './app/hooks';
import ApplicationForm from './pages/Forms/Application/ApplicationForm';

const Container = styled.div`
    min-height: 100vh;
    min-width: 100%;
    background: linear-gradient(
        45deg,
        ${(props) => props.theme.color.background} 0%,
        ${(props) => props.theme.color.background} 40%,
        ${(props) => props.theme.color.backgroundStripe} 40%,
        ${(props) => props.theme.color.backgroundStripe} 70%,
        ${(props) => props.theme.color.background} 70%,
        ${(props) => props.theme.color.background} 100%
    );
    box-sizing: border-box;
`;

function App() {
    const location = useLocation();

    return (
        <>
            <Container>
                <Header />
                <ScrollToTop />
                <AnimatePresence initial={false} exitBeforeEnter>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route element={<RequireAuth />}>
                            <Route path="applications">
                                <Route index element={<Applications />} />
                                <Route path="new/*" element={<ApplicationForm />} />
                                <Route path=":id" element={<Application />} />
                                <Route path="edit/:id/*" element={<ApplicationForm />} />
                            </Route>
                            <Route path="interviews">
                                <Route index element={<Interviews />} />
                                <Route path="new/*" element={<InterviewForm />} />
                                <Route path="edit/:id/*" element={<InterviewForm />} />
                            </Route>
                            <Route path="contacts/new/*" element={<ContactForm />} />
                            <Route path="contacts/edit/:id/*" element={<ContactForm />} />
                            <Route path="me" element={<EditProfile />} />
                            <Route path="/stats" element={<Stats />} />
                        </Route>
                        <Route path="404" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AnimatePresence>
                <Footer />
            </Container>
        </>
    );
}

export default App;
