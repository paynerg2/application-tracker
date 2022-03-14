import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { UserProfileImage, DefaultProfileImage } from './profileImage.styles';

interface Props {
    name: string;
    img?: string;
    style?: React.CSSProperties;
}

function ProfileImage({ name, img, style }: Props) {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const handleImageClick = () => navigate('/me');

    if (img && img.length > 0) {
        return <UserProfileImage src={img} alt="Profile Picture Preview" style={style} />;
    }

    return (
        <>
            {user?.profileImage ? (
                <UserProfileImage
                    onClick={handleImageClick}
                    src={user.profileImage}
                    alt="User Profile Picture"
                    style={style}
                />
            ) : (
                <DefaultProfileImage onClick={handleImageClick} style={style}>
                    {user?.fullName?.charAt(0).toLocaleUpperCase() || '?'}
                </DefaultProfileImage>
            )}
        </>
    );
}

export default ProfileImage;
