import React from 'react';
import { Application } from '../../../interfaces/application';
import Checkbox from '../../Checkbox/checkbox';
import StyleSelector from '../../StyleSelector/styleSelector';
import { CheckboxGroup, CountDisplay, Layout, SearchBox } from './ApplicationFilter.styles';

interface Props {
    applications: Application[];
    filters: string[];
    onChange: (s: string) => void;
    setIsCardView: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplicationFilter({ applications, filters, onChange, setIsCardView }: Props) {
    const remoteJobsCount = applications.reduce(function (r, a) {
        const isRemote = a.location.toLocaleLowerCase() === 'remote';
        return isRemote ? r + 1 : r;
    }, 0);

    const openSubmissionsCount = applications.reduce(function (r, a) {
        const isOpen = a.response.toLocaleLowerCase() !== 'interview';
        return isOpen ? r + 1 : r;
    }, 0);

    // Shape: {...[skillName]: number}
    const mainSkillsFrequencyMap = applications.reduce(function (r, a) {
        r[a.mainSkill] = r[a.mainSkill] || 0;
        r[a.mainSkill]++;
        return r;
    }, Object.create(null));

    return (
        <Layout>
            <SearchBox placeholder="Search..." />
            <StyleSelector setIsCardView={setIsCardView} />
            <CheckboxGroup>
                <Checkbox label="Remote" onChange={onChange} />
                <CountDisplay>{remoteJobsCount}</CountDisplay>
            </CheckboxGroup>
            <CheckboxGroup>
                <Checkbox label="Open" onChange={onChange} />
                <CountDisplay>{openSubmissionsCount}</CountDisplay>
            </CheckboxGroup>
            {Object.keys(mainSkillsFrequencyMap)
                .sort()
                .map((key) => (
                    <CheckboxGroup key={key}>
                        <Checkbox label={key} onChange={onChange} />
                        <CountDisplay>{mainSkillsFrequencyMap[key]}</CountDisplay>
                    </CheckboxGroup>
                ))}
        </Layout>
    );
}

export default ApplicationFilter;
