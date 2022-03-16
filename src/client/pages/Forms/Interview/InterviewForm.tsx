import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    FormHeader,
    Layout,
    Container,
    FormSection,
    ImageSection,
    Image,
    Form,
} from '../../../components/Form/form';
import InterviewFormImage from '../../../assets/Interview_Form_Image.svg';
import {
    useAddNewInterviewMutation,
    useEditInterviewMutation,
    useGetInterviewsQuery,
} from '../../../services/api';
import { getLastArrayElement } from '../../../_helpers/arrayHelpers';
import Step1 from './Step1';
import { hasKey } from '../../../_helpers/objectHelpers';
import { getDateFormattedForDatetimeLocalInput } from '../../../_helpers/dateFormatter';
import { useYupValidationResolver } from '../../../_helpers/useYupValidationResolver';
import { interviewValidationSchema } from '../../../_helpers/validators/interviewValidationSchema';
import { Interview } from '../../../interfaces/interviews';

interface Props {
    isEdit?: boolean;
}

type RouteParams = {
    id?: string | undefined;
};

function InterviewForm({ isEdit = false }: Props) {
    const resolver = useYupValidationResolver(interviewValidationSchema);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<Partial<Interview>>({ resolver, mode: 'onTouched' });
    const navigate = useNavigate();

    const [addNewInterview] = useAddNewInterviewMutation();
    const [editInterview] = useEditInterviewMutation();

    const { id } = useParams<RouteParams>();
    const { interview, ...rest } = useGetInterviewsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            interview: data?.find((i) => i.id === id),
        }),
    });

    const location = useLocation();
    const step = parseInt(getLastArrayElement(location.pathname.split('/')));

    useEffect(() => {
        // Pre-fill form if editing
        const formFields = ['company', 'startTime', 'interviewType'];

        if (!interview) return;

        formFields.forEach((field) => {
            if (hasKey(interview, field)) {
                if (field === 'startTime') {
                    const formattedDateField = getDateFormattedForDatetimeLocalInput(
                        new Date(interview[field])
                    );
                    //@ts-ignore
                    setValue(field, formattedDateField);
                } else {
                    setValue(field, interview[field]);
                }
            }
        });
    }, [interview]);

    const onSubmit = async (data: any) => {
        const submission = id
            ? { ...data, id, startTime: new Date(data.startTime) }
            : { ...data, startTime: new Date(data.startTime) };

        try {
            if (isEdit && id) {
                await editInterview(submission);
            } else {
                await addNewInterview(submission);
            }
        } catch (error) {
            console.log(error);
            // todo: build out error response
        }

        navigate('/interviews');
    };

    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader>{isEdit ? 'Edit ' : 'Add a New '}Interview</FormHeader>
                    <Form id="interviewForm" onSubmit={handleSubmit(onSubmit)}>
                        <Routes>
                            <Route
                                path="1"
                                element={
                                    <Step1 register={register} errors={errors} isValid={isValid} />
                                }
                            />
                        </Routes>
                    </Form>
                </FormSection>
                <ImageSection>
                    <Image aria-hidden={true} src={InterviewFormImage} alt="Interview Form Image" />
                </ImageSection>
            </Container>
        </Layout>
    );
}

export default InterviewForm;
