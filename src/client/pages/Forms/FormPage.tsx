import React, { ReactNode } from 'react';
import Form from './Form';
import {
    FormHeader,
    Layout,
    Container,
    FormSection,
    ImageSection,
    Image,
} from '../../components/Form/form';

interface Props<T> {
    steps: any[];
    image: string;
    header: string;
    onSubmit: any;
    initialValues: Partial<T>;
    children?: ReactNode;
}

const FormPage = <T extends object>({
    steps,
    image,
    header,
    onSubmit,
    initialValues,
    children,
}: Props<T>) => {
    return (
        <Layout>
            <Container>
                <FormSection>
                    <FormHeader>{header}</FormHeader>
                    {/* @ts-ignore */}
                    <Form steps={steps} initialValues={initialValues} onSubmit={onSubmit} />
                    {children}
                </FormSection>
                <ImageSection>
                    <Image aria-hidden={true} src={image} alt={`Form Image`} />
                </ImageSection>
            </Container>
        </Layout>
    );
};

export default FormPage;
