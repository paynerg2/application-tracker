import React from 'react';
import ApplicationCard from '../../components/Cards/Application/applicationCard';
import Checkbox from '../../components/Checkbox/checkbox';
import StyleSelector from '../../components/StyleSelector/styleSelector';
import { Application } from '../../interfaces/application';
import { groupedApplications } from './testData';

function Test() {
    console.log(groupedApplications);
    return (
        <>
            {Object.keys(groupedApplications)
                .sort((a, b) => {
                    const aDate = new Date(a);
                    const bDate = new Date(b);
                    // Sort in descending order (i.e. newest date first)
                    return bDate.getTime() - aDate.getTime();
                })
                .map((date) => (
                    <div key={date}>
                        <h2>{date}</h2>
                        <br />
                        {groupedApplications[date].map((app: Application) => (
                            <ApplicationCard key={app.id} application={app} />
                        ))}
                    </div>
                ))}
        </>
    );
}

export default Test;
