import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { isEmpty } from '../../_helpers/objectHelpers';
import Button from '../../components/Button/button';
import { Layout, SimplifySection, MainHeading } from './Landing.styles';
import TextButton from '../../components/TextButton/textButton';

function LandingPage() {
    const user = useAppSelector((state) => state.auth.user);
    let navigate = useNavigate();

    useEffect(() => {
        if (!isEmpty(user)) {
            navigate('applications');
        }
    }, [user]);

    return (
        <Layout>
            <SimplifySection>
                <MainHeading id="simplify_heading">Simplify Your Job Hunt</MainHeading>
                <p id="simplify_text">
                    A single resource to stay organized and track your journey toward a career in
                    software development
                </p>
                <div id="simplify_cta">
                    <Button onClick={() => navigate('/signup')}>Get Started</Button>
                    <div>
                        <p>
                            Already have an account?{' '}
                            <TextButton
                                color="primary"
                                style={{ fontSize: '1em' }}
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </TextButton>
                        </p>
                    </div>
                </div>
            </SimplifySection>
        </Layout>
    );
}

export default LandingPage;
