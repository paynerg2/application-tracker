import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';
import { localFileToDataURL } from '../../_helpers/toDataURL';
import { FormInputs } from '../../pages/UserProfile/EditProfile';
import { Error } from '../Form/form';
import Input, { InputProps } from '../Input/input';
import { Container } from './imageDropzone.styles';

interface Props extends InputProps {
    setValue: UseFormSetValue<FormInputs>;
}

// Note: "Function components cannot contain a ref" error caused by <Input> if
// this isn't constructed with a forwardRef.

const ImageDropzone = React.forwardRef<React.Ref<HTMLInputElement>, Props>(
    ({ setValue, ...rest }, ref) => {
        const [error, setError] = useState<string>('');
        const onDrop = useCallback(
            async (acceptedFiles, rejectedFiles) => {
                if (rejectedFiles.length > 0) {
                    setError('Something went wrong. Please try again.');
                    return;
                }

                // Convert file to Base64 before setting the form value
                await localFileToDataURL(acceptedFiles[0], (result: string) => {
                    //@ts-ignore
                    setValue(rest.id, result);
                });
            },
            [rest.id, setValue]
        );

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: 'image/*',
            maxFiles: 1,
        });

        return (
            <>
                <Container {...getRootProps()} ref={ref}>
                    <Input {...getInputProps()} {...rest} />
                    {isDragActive ? (
                        <p>Drop profile image here</p>
                    ) : (
                        <p>Drag and drop, or click to select an image</p>
                    )}
                </Container>
                <Error>{error}</Error>
            </>
        );
    }
);

export default ImageDropzone;
