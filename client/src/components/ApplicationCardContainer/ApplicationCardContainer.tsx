import React, { useState } from 'react';
import { Application } from '../../interfaces/application';
import { paginate } from '../../_helpers/arrayHelpers';
import ApplicationCard from '../Cards/Application/applicationCard';
import TextButton from '../TextButton/textButton';
import { Container, PaginationButtions } from './ApplicationCardContainer.styles';

interface Props {
    applications: Application[];
}

const ApplicationCardContainer = ({ applications }: Props) => {
    const [page, setPage] = useState<number>(1);
    const pageSize = 4;
    const totalPages = Math.ceil(applications.length / pageSize);

    const isLastPage = () => {
        if (isOnlyPage()) return true;

        return page === totalPages;
    };

    const isFirstPage = () => {
        if (isOnlyPage()) return true;

        return page === 1;
    };

    const isOnlyPage = () => {
        return applications.length <= pageSize;
    };

    const incrementPage = () => {
        if (!isLastPage()) {
            setPage((prev) => prev + 1);
        }
    };

    const decrementPage = () => {
        if (!isFirstPage()) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <Container>
            {paginate(applications, pageSize, page).map((app: Application) => (
                <ApplicationCard key={app.id} application={app} />
            ))}
            <PaginationButtions>
                {!isFirstPage() && (
                    <TextButton id="prevButton" onClick={decrementPage}>
                        &larr; prev
                    </TextButton>
                )}
                {!isLastPage() && (
                    <TextButton id="nextButton" onClick={incrementPage}>
                        next &rarr;
                    </TextButton>
                )}
            </PaginationButtions>
        </Container>
    );
};

export default ApplicationCardContainer;
