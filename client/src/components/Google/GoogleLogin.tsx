import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

interface Props {
    loginSuccess: (resposne: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
}

const GoogleLoginComponent = ({ loginSuccess }: Props) => {
    console.log('client id');
    console.log(`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`);

    return (
        <>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
                buttonText="Log in with Google"
                onSuccess={loginSuccess}
                onFailure={(response: any) => console.log(response)}
                cookiePolicy={'single_host_origin'}
                responseType={'code,token'}
                scope="profile"
            />
        </>
    );
};

export default GoogleLoginComponent;
