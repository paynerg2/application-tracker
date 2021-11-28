import React from 'react';
import Button from '../../components/Button/button';
import LandingImage1 from '../../assets/Landing_Image1.svg';
import LandingImage2 from '../../assets/Landing_Image2.svg';
import LandingImage3 from '../../assets/Landing_Image3.svg';
import {
    Layout,
    SimplifySection,
    MainHeading,
    EssentialsSection,
    BlueBackground,
    AnalyticsSection,
} from './Landing.styles';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <Layout>
            <SimplifySection>
                <MainHeading id="simplify_heading">Simplify Your Job Hunt</MainHeading>
                <p id="simplify_text">
                    A single resource to keep track of everything you need to know about finding
                    your next dream job
                </p>
                <Link id="simplify_cta" to="/signup">
                    <Button>Get Started</Button>
                </Link>
                <img
                    id="simplify_image"
                    aria-hidden={true}
                    src={LandingImage1}
                    alt="Job Hunt Image"
                />
            </SimplifySection>
            <BlueBackground>
                <EssentialsSection>
                    <img
                        id="essential_image"
                        aria-hidden={true}
                        src={LandingImage2}
                        alt="Keep Track"
                    />
                    <h2 id="essential_heading">Keep Track Of All the Essentials</h2>
                    <ul id="essential_list">
                        <li>Job Applications</li>
                        <li>Interviews</li>
                        <li>Feedback</li>
                        <li>Offers</li>
                    </ul>
                </EssentialsSection>
            </BlueBackground>
            <AnalyticsSection>
                <h2 id="analytics_heading">Detailed Analytics To Chart Your Path To Success</h2>
                <p id="analytics_text">Quickly find the approach that yields the best results</p>
                <img
                    id="analytics_image"
                    aria-hidden={true}
                    src={LandingImage3}
                    alt="Get Detailed Analytics"
                />
            </AnalyticsSection>
        </Layout>
    );
}

export default LandingPage;
