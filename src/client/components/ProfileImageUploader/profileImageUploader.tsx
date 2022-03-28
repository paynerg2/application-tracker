import React, { useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useUpdateUserMutation } from '../../services/api';
import { setUser } from '../../state/authSlice';
import { User } from '../../interfaces/user';
import Button from '../Button/button';
import ImageDropzone from '../ImageDropzone/imageDropzone';
import ProfileImage from '../ProfileImage/profileImage';
import { Error } from '../Form/form';
import { Container, DropzoneWithPreview } from './profileImageUploader.styles';

interface Props {
    user: User;
}

const ProfileImageUploader = ({ user }: Props) => {
    const [profileImage, setProfileImage] = useState(user.profileImage || '');
    const dropzoneRef = useRef(null);
    const dispatch = useAppDispatch();
    const [updateUserDetails] = useUpdateUserMutation();

    const handleProfilePictureChanged = async () => {
        const _user: User = {
            ...user,
            profileImage: profileImage,
        };

        try {
            const updatedUser = await updateUserDetails(_user).unwrap();
            dispatch(setUser(updatedUser));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <DropzoneWithPreview>
                <ImageDropzone setImage={setProfileImage} ref={dropzoneRef} />
                <ProfileImage name="" img={profileImage} style={{ width: '8em', height: '8em' }} />
            </DropzoneWithPreview>
            <Error />
            <Button onClick={handleProfilePictureChanged}>Save Profile Picture</Button>
        </Container>
    );
};

export default ProfileImageUploader;
