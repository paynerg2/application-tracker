import React from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../_helpers/capitalize';
import { Container, HorizontalLine, MenuItem } from './mobileMenu.styles';

interface Props {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    onLogout: () => Promise<void>;
}

function MobileMenu({ show, setShow, onLogout }: Props) {
    const navigate = useNavigate();
    const navRoutes = ['applications', 'interviews', 'stats'];

    const handleLogout = () => {
        onLogout();
        setShow((prev) => !prev);
    };

    const handleNavigate = (location: string) => {
        navigate(location);
        setShow((prev) => !prev);
    };

    const getNavLinks = () => {
        return navRoutes.map((route) => (
            <MenuItem onClick={() => handleNavigate(`/${route}`)}>
                {capitalizeFirstLetter(route)}
            </MenuItem>
        ));
    };

    return (
        <>
            {show && (
                <Container>
                    {getNavLinks()}
                    <HorizontalLine />
                    <MenuItem onClick={() => handleNavigate('/me')}>Edit Profile</MenuItem>
                    <HorizontalLine />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Container>
            )}
        </>
    );
}

export default MobileMenu;
