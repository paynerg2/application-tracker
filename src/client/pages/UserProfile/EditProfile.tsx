import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser } from '../../state/authSlice';
import { hasKey } from '../../_helpers/objectHelpers';
import { Layout, Form, FormHeader, FormSection, Error } from '../../components/Form/form';
import { Container, Actions } from './editProfile.styles';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import ImageDropzone from '../../components/ImageDropzone/imageDropzone';
import ProfileImageWatched from '../../components/ProfileImage/profileImageWatched';
import ToggleSwitch from '../../components/ToggleSwitch/toggleSwitch';
import { useUpdateUserMutation } from '../../services/api';
import { toDataURL } from '../../_helpers/toDataURL';
import { User } from '../../interfaces/user';

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
    const [updateUser] = useUpdateUserMutation();
    const dropzoneRef = useRef(null);

    useEffect(() => {
        const formFields = ['fullName', 'location', 'email', 'profileImage'];

        if (user) {
            formFields.forEach((field) => {
                if (hasKey(user, field)) {
                    //@ts-ignore
                    setValue(field, user[field]);
                }
            });
        }
    }, []);

    const onSubmit = async (data: any) => {
        let submissionData = { ...data, id: user!._id };
        if (data.profileImage.includes('cloudinary')) {
            await toDataURL(data.profileImage, (result: string) => {
                submissionData = { ...submissionData, profileImage: result };
            });
        }
        console.log(submissionData);
        try {
            const payload = await updateUser(submissionData).unwrap();
            dispatch(setUser(payload));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Layout>
                <FormSection>
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
                                    style={{ cursor: 'default', height: '15vmin', width: '15vmin' }}
                                />
                            )}
                        </div>
                        <Error />
                        <Actions>
                            <Button type="submit">Save Changes</Button>
                        </Actions>
                    </Form>
                </FormSection>
                <FormSection>
                    <FormHeader>Settings</FormHeader>
                    <Form id="userSettings">
                        <div>Dark Mode</div>
                        <div>Default application display style</div>
                        <ToggleSwitch handleChange={() => console.log('changed')} />
                    </Form>
                </FormSection>
            </Layout>
        </Container>
    );
}

export default EditProfile;
