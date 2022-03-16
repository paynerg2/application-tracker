import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useUpdateUserMutation, useUpdateUserSettingsMutation } from '../../services/api';
import { setUser } from '../../state/authSlice';
import { hasKey } from '../../_helpers/objectHelpers';
import { toDataURL } from '../../_helpers/toDataURL';
import { Form, FormHeader, FormSection, Error } from '../../components/Form/form';
import { Layout, Container, Actions } from './editProfile.styles';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import ImageDropzone from '../../components/ImageDropzone/imageDropzone';
import StyleSelector from '../../components/StyleSelector/styleSelector';
import ProfileImageWatched from '../../components/ProfileImage/profileImageWatched';
import ToggleSwitch from '../../components/ToggleSwitch/toggleSwitch';
import { User } from '../../interfaces/user';
import { join } from 'path';

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
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control,
    } = useForm<FormInputs>();
    const [updateUserDetails] = useUpdateUserMutation();
    const [updateUserSettings] = useUpdateUserSettingsMutation();
    const dropzoneRef = useRef(null);

    useEffect(() => {
        // Pre-fill form fields where applicable
        const formFields = ['fullName', 'location', 'email', 'profileImage'];

        if (user) {
            formFields.forEach((field) => {
                if (hasKey(user, field)) {
                    //@ts-ignore
                    setValue(field, user[field]);
                }
            });
        }
    }, [user, setValue]);

    const onSubmit = async (data: any) => {
        // Convert existing image to Base64 string to match image dropzone return format
        let submissionData: User = { ...data };
        if (data.profileImage.includes('cloudinary')) {
            await toDataURL(data.profileImage, (result: string) => {
                submissionData = { ...submissionData, profileImage: result };
            });
        }

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

        console.log(_user);

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
                <FormSection id="accountDetails">
                    <FormHeader>Edit Account Details</FormHeader>
                    <Form id="userForm" onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id="fullName"
                            label="Full Name"
                            register={register}
                            required
                            type="text"
                        />
                        <Error>{errors.fullName ? 'Required' : ''}</Error>
                        <Input
                            id="location"
                            label="Location"
                            register={register}
                            required={false}
                            type="text"
                        />
                        <Error />
                        <Input id="email" label="Email" register={register} required type="text" />
                        <Error />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ImageDropzone
                                id="profileImage"
                                label="Profile Image"
                                register={register}
                                required={false}
                                setValue={setValue}
                                ref={dropzoneRef}
                            />
                            {user && (
                                <ProfileImageWatched
                                    name={user.fullName}
                                    control={control}
                                    style={{
                                        cursor: 'default',
                                        height: '15vmin',
                                        width: '15vmin',
                                    }}
                                />
                            )}
                        </div>
                        <Error />
                        <Actions>
                            <Button type="submit">Save Changes</Button>
                        </Actions>
                    </Form>
                </FormSection>
                <FormSection id="userSettings">
                    <FormHeader>Settings</FormHeader>
                    <section>
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
                    </section>
                </FormSection>
            </Layout>
        </Container>
    );
}

export default EditProfile;
