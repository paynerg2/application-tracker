import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserProfileImage, DefaultProfileImage } from './profileImage.styles';

interface Props {
    name: string;
}

function ProfileImage({ name }: Props) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleImageClick = () => navigate('/me');

    return (
        <>
            {user?.profileImage ? (
                <UserProfileImage src={user.profileImage} alt="User Profile Picture" />
            ) : (
                <DefaultProfileImage onClick={handleImageClick}>
                    {user?.fullName.charAt(0).toLocaleUpperCase() || '?'}
                </DefaultProfileImage>
            )}
        </>
    );
}

export default ProfileImage;
