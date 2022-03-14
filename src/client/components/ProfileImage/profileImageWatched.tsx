import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import ProfileImage from './profileImage';
import { FormInputs } from '../../pages/UserProfile/EditProfile';

/*
 * Wrapper to the ProfileImage component to watch its value in a react-hook-form.
 * Used to update the preview image on the edit profile page when changing user avatar.
 * See: https://react-hook-form.com/api/usewatch
 */

interface Props {
    control: Control<FormInputs>;
    name: string;
    style?: React.CSSProperties;
}

function ProfileImageWatched({ control, name, style }: Props) {
    const image = useWatch({
        control,
        name: 'profileImage',
        defaultValue: '',
    });

    return <ProfileImage name={name} img={image} style={style} />;
}

export default ProfileImageWatched;
