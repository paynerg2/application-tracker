import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { localFileToDataURL } from '../../_helpers/fileHelpers';
import { Error } from '../Form/form';
import { StyledInput } from '../Input/input.styles';
import Input from '../Input/input';
import { Container } from './imageDropzone.styles';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
    setImage: React.Dispatch<React.SetStateAction<string>>;
}

// Note: "Function components cannot contain a ref" error caused by <Input> if
// this isn't constructed with a forwardRef.

const Dropzone = styled(StyledInput)`
    height: 8em;
    width: 24em;
`;

const ImageDropzone = React.forwardRef<React.Ref<HTMLInputElement>, Props>(
    ({ setImage, ...rest }, ref) => {
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
                    setImage(result);
                });
            },
            [setImage]
        );

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: 'image/*',
            maxFiles: 1,
        });

        return (
            <>
                <Container {...getRootProps()} ref={ref}>
                    <Dropzone {...getInputProps()} {...rest} />
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
