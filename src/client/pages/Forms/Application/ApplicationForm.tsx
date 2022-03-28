import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormPage from '../../Forms/FormPage';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import ApplicationFormImage from '../../../assets/New_Application_Image.svg';
import {
    useAddNewApplicationMutation,
    useEditApplicationMutation,
    useGetApplicationsQuery,
} from '../../../services/api';

type RouteParams = {
    id?: string | undefined;
};

const ApplicationForm = () => {
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();
    const [addNewApplication] = useAddNewApplicationMutation();
    const [editApplication] = useEditApplicationMutation();
    const { application, ...rest } = useGetApplicationsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            application: data?.find((a) => a.id === id),
        }),
    });

    const header = `${id ? 'Edit' : 'Add'} Application`;

    const onSubmit = async (data: any) => {
        try {
            if (id) {
                await editApplication({ id, ...data });
            } else {
                await addNewApplication(data);
            }
        } catch (error) {
            console.log(error);
        }
        navigate('/applications');
    };
    const handleSubmit = useCallback(onSubmit, []);

    return (
        <>
            {(application || !id) && (
                <FormPage
                    steps={[Step1, Step2, Step3]}
                    image={ApplicationFormImage}
                    header={header}
                    initialValues={application ? application : {}}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};

export default ApplicationForm;
