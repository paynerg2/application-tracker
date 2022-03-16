import React, { useCallback } from 'react';
import * as yup from 'yup';

export const useYupValidationResolver = (validationSchema: any) =>
    useCallback(
        async (data) => {
            try {
                const values = await validationSchema.validateSync(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors: any) {
                console.log('useyup');
                console.log(errors);
                return {
                    values: {},
                    errors: errors?.inner.reduce(
                        (allErrors: any, currentError: any) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? 'validation',
                                message: currentError.message,
                            },
                        }),
                        {}
                    ),
                };
            }
        },
        [validationSchema]
    );
