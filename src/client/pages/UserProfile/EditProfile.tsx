import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useUpdateUserMutation, useUpdateUserSettingsMutation } from '../../services/api';
import { setUser } from '../../state/authSlice';
import { FormHeader } from '../../components/Form/form';
import { Layout, Container, OptionsSection, UserInfo } from './editProfile.styles';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import StyleSelector from '../../components/StyleSelector/styleSelector';
import ToggleSwitch from '../../components/ToggleSwitch/toggleSwitch';
import { User } from '../../interfaces/user';
import ProfileImageUploader from '../../components/ProfileImageUploader/profileImageUploader';
import { yupResolver } from '@hookform/resolvers/yup';
import { toDataURL } from '../../_helpers/fileHelpers';
import { userProfileInfoValidationSchema } from '../../_helpers/validators/userValidationSchema';

export interface FormInputs {
    fullName: string;
    location: string;
    email: string;
    profileImage: string;
}

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [updateUserDetails] = useUpdateUserMutation();
    const [updateUserSettings] = useUpdateUserSettingsMutation();
    const methods = useForm({
        defaultValues: {
            location: user.location || '',
            email: user.email || '',
            fullName: user.fullName || '',
        },
        resolver: yupResolver(userProfileInfoValidationSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: any) => {
        // Convert existing image to Base64 string to match image dropzone return format
        let submissionData: User = { _id: user._id, ...data };

        try {
            const updatedUser = await updateUserDetails(submissionData).unwrap();
            dispatch(setUser(updatedUser));
        } catch (error) {
            console.log(error);
        }

        navigate(0);
    };

    const handleApplicationDisplayStyleChange = async () => {
        const _user: User = {
            ...user,
            settings: {
                ...user.settings,
                defaultApplicationDisplayStyle:
                    user.settings.defaultApplicationDisplayStyle.toLowerCase() === 'card'
                        ? 'List'
                        : 'Card',
            },
        };

        try {
            const updatedUser = await updateUserSettings(_user).unwrap();
            dispatch(setUser(updatedUser));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDarkThemeToggle = async () => {
        const _user: User = {
            ...user,
            settings: {
                ...user.settings,
                isDarkMode: !user.settings.isDarkMode,
            },
        };

        await updateUser(_user);
    };

    const updateUser = async (user: User) => {
        try {
            const updatedUser = await updateUserSettings(user).unwrap();
            dispatch(setUser(updatedUser));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Layout>
                <OptionsSection>
                    <UserInfo>
                        <div>
                            <FormHeader style={{ marginBottom: '1em' }}>Edit User Info</FormHeader>
                            <FormProvider {...methods}>
                                <Input label="Full Name" {...methods.register('fullName')} />
                                <Input label="Email" {...methods.register('email')} />
                                <Input label="Location" {...methods.register('location')} />
                                <Button onClick={methods.handleSubmit(onSubmit)}>
                                    Update User Info
                                </Button>
                            </FormProvider>
                        </div>
                        <ProfileImageUploader user={user} />
                    </UserInfo>
                    <div>
                        <FormHeader>Settings</FormHeader>
                        <div style={{ display: 'flex', gap: '2vmin', alignItems: 'center' }}>
                            <h4>Dark Mode</h4>
                            <ToggleSwitch
                                isChecked={user.settings.isDarkMode}
                                handleChange={handleDarkThemeToggle}
                            />
                        </div>
                        <h4>Default application display style</h4>
                        <StyleSelector
                            isCardView={
                                user.settings.defaultApplicationDisplayStyle.toLowerCase() ===
                                'card'
                            }
                            toggleCardView={handleApplicationDisplayStyleChange}
                        />
                    </div>
                </OptionsSection>
            </Layout>
        </Container>
    );
}

export default EditProfile;
