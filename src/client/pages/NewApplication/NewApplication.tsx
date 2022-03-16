import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    getDateFormattedForDatetimeLocalInput,
    getDateFormattedForInput,
} from '../../_helpers/dateFormatter';

import {
    FormHeader,
    Layout,
    Container,
    FormSection,
    ImageSection,
    Image,
    Form,
} from '../../components/Form/form';
import Stepper from '../../components/Form/stepper';
import Step1 from '../../components/ApplicationForm/Step1';
import Step2 from '../../components/ApplicationForm/Step2';
import Step3 from '../../components/ApplicationForm/Step3';
import NewApplicationImage from '../../assets/New_Application_Image.svg';
import {
    useAddNewApplicationMutation,
    useEditApplicationMutation,
    useGetApplicationsQuery,
} from '../../services/api';
import { hasKey } from '../../_helpers/objectHelpers';
import { getLastArrayElement } from '../../_helpers/arrayHelpers';
import { useYupValidationResolver } from '../../_helpers/useYupValidationResolver';
import { applicationValidationSchema } from '../../_helpers/validators/applicationValidationSchema';
import { Application } from '../../interfaces/application';

interface Props {
    isEdit?: boolean;
}

type RouteParams = {
    id?: string | undefined;
};

function NewApplication({ isEdit = false }: Props) {
    const resolver = useYupValidationResolver(applicationValidationSchema);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<Partial<Application>>({ resolver, mode: 'onTouched' });
    const navigate = useNavigate();

    const [addNewApplication, { isLoading }] = useAddNewApplicationMutation();
    const [editApplication] = useEditApplicationMutation();

    const { id } = useParams<RouteParams>();
    const { application, ...rest } = useGetApplicationsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            application: data?.find((a) => a.id === id),
        }),
    });

    const location = useLocation();
    const step = parseInt(getLastArrayElement(location.pathname.split('/')));

    useEffect(() => {
        const formFields = [
            'jobTitle',
            'company',
            'contract',
            'location',
            'mainSkill',
            'yearsOfExperience',
            'degreeLevel',
            'datePosted',
            'dateApplicationSent',
            'requiredSkillsTotal',
            'requiredSkillsMet',
            'additionalSkillsTotal',
            'additionalSkillsMet',
        ];

        if (!application) return;

        formFields.forEach((field) => {
            if (hasKey(application, field)) {
                if (field.includes('date')) {
                    // Convert to RFC3339 formatted date to set html input field
                    const formattedDateField = getDateFormattedForDatetimeLocalInput(
                        new Date(application[field] as string)
                    );
                    setValue(field, formattedDateField);
                } else {
                    setValue(field, application[field]);
                }
            }
        });
    }, []);

    const onSubmit = async (data: any) => {
        console.log(data.datePosted);
        const newApplication = id
            ? {
                  ...data,
                  id,
                  datePosted: new Date(data.datePosted),
                  dateApplicationSent: new Date(data.dateApplicationSent),
              }
            : {
                  ...data,
                  datePosted: new Date(data.datePosted),
                  dateApplicationSent: new Date(data.dateApplicationSent),
              };

        try {
            if (isEdit && id) {
                await editApplication(newApplication);
            } else {
                await addNewApplication(newApplication);
            }
        } catch (error) {
            console.log(error);
        }
        navigate('/applications');
    };

    // todo: form validation
    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader>{isEdit ? 'Edit ' : 'Add a New '}Application</FormHeader>
                    <Stepper steps={3} currentStep={step} baseRoute="/applications/new" />
                    <Form id="newApplication" onSubmit={handleSubmit(onSubmit)}>
                        <Routes>
                            <Route
                                path="1"
                                element={<Step1 register={register} errors={errors} />}
                            />
                            <Route
                                path="2"
                                element={<Step2 register={register} errors={errors} />}
                            />
                            <Route
                                path="3"
                                element={
                                    <Step3 register={register} errors={errors} isValid={isValid} />
                                }
                            />
                        </Routes>
                    </Form>
                </FormSection>
                <ImageSection>
                    <Image
                        aria-hidden={true}
                        src={NewApplicationImage}
                        alt="New Application Image"
                    />
                </ImageSection>
            </Container>
        </Layout>
    );
}

export default NewApplication;
