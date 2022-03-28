import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InterviewFormImage from '../../../assets/Interview_Form_Image.svg';
import {
    useAddNewInterviewMutation,
    useEditInterviewMutation,
    useGetInterviewsQuery,
} from '../../../services/api';
import Step1 from './Step1';
import FormPage from '../FormPage';

type RouteParams = {
    id?: string | undefined;
};

const InterviewForm = () => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();
    const [addNewInterview] = useAddNewInterviewMutation();
    const [editInterview] = useEditInterviewMutation();
    const { interview, ...rest } = useGetInterviewsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            interview: data?.find((i) => i.id === id),
        }),
    });

    const header = `${id ? 'Edit' : 'Add'} Interview`;

    const onSubmit = async (data: any) => {
        try {
            if (id) {
                await editInterview({ id, ...data });
            } else {
                await addNewInterview(data);
            }
        } catch (error) {
            console.log(error);
        }
        navigate('/interviews');
    };
    const handleSubmit = useCallback(onSubmit, []);

    return (
        <>
            {(interview || !id) && (
                <FormPage
                    steps={[Step1]}
                    image={InterviewFormImage}
                    header={header}
                    initialValues={interview ? interview : {}}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};

export default InterviewForm;
