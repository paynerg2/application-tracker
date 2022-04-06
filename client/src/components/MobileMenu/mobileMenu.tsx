import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../_helpers/capitalize';
import { Container, HorizontalLine, LinkContainer, MenuItem } from './mobileMenu.styles';

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
            <MenuItem
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
                key={route}
                onClick={() => handleNavigate(`/${route}`)}
            >
                {capitalizeFirstLetter(route)}
            </MenuItem>
        ));
    };

    /** Animations */
    const itemVariants = {
        closed: {
            opacity: 0,
        },
        open: {
            opacity: 1,
        },
    };

    const menuVariants = {
        closed: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1,
            },
        },
    };

    return (
        <AnimatePresence>
            {show && (
                <Container
                    key="mobileMenu"
                    initial={{ height: 0 }}
                    animate={{ height: '25em' }}
                    exit={{
                        height: 0,
                        transition: {
                            delay: 0.2,
                            duration: 0.3,
                        },
                    }}
                >
                    <LinkContainer
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        {getNavLinks()}
                        <HorizontalLine key="line1" exit={{ opacity: 0 }} />
                        <MenuItem
                            key="editProfile"
                            onClick={() => handleNavigate('/me')}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={itemVariants}
                        >
                            Edit Profile
                        </MenuItem>
                        <HorizontalLine key="line2" exit={{ opacity: 0 }} />
                        <MenuItem
                            variants={itemVariants}
                            key="logout"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            onClick={handleLogout}
                        >
                            Logout
                        </MenuItem>
                    </LinkContainer>
                </Container>
            )}
        </AnimatePresence>
    );
}

export default MobileMenu;
