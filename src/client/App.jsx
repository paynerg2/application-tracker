import React from 'react';
import { useGetApplicationsQuery } from './services/api';

function App() {
    const { data, error, isLoading } = useGetApplicationsQuery();

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <ul>
                {data.map((app) => (
                    <div>{JSON.stringify(app)}</div>
                ))}
            </ul>
        </>
    );
}

export default App;
