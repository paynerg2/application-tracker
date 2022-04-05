import React from 'react';
import { Application } from '../../../interfaces/application';
import { ApplicationFilters } from '../../../pages/Applications/Applications';
import Checkbox from '../../Checkbox/checkbox';
import { FilterSection } from './ApplicationFilter.styles';
import StyleSelector from '../../StyleSelector/styleSelector';
import { CheckboxGroup, CountDisplay, Layout, SearchBox } from './ApplicationFilter.styles';
import FilterImage from '../../../assets/icons8-funnel-50.png';

interface Props {
    applications: Application[];
    filters: ApplicationFilters;
    onChange: (s: string, type: string) => void;
    setIsCardView: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplicationFilter({ applications, filters, onChange, setIsCardView }: Props) {
    const remoteJobsCount = applications.reduce(function (r, a) {
        const isRemote = a.location.toLocaleLowerCase() === 'remote';
        return isRemote ? r + 1 : r;
    }, 0);

    const openSubmissionsCount = applications.reduce(function (r, a) {
        const isOpen = a.response.toLocaleLowerCase() !== 'rejected';
        return isOpen ? r + 1 : r;
    }, 0);

    // Shape: {...[skillName]: number}
    const mainSkillsFrequencyMap = applications.reduce(function (r, a) {
        r[a.mainSkill] = r[a.mainSkill] || 0;
        r[a.mainSkill]++;
        return r;
    }, Object.create(null));

    const locationFrequencyMap = applications.reduce(function (r, a) {
        // avoid double-counting 'remote' location
        if (a.location.toLocaleLowerCase() !== 'remote') {
            r[a.location] = r[a.location] || 0;
            r[a.location]++;
        }
        return r;
    }, Object.create(null));

    return (
        <Layout>
            <SearchBox placeholder="Search..." />
            <StyleSelector toggleCardView={() => setIsCardView((prev) => !prev)} />
            <FilterSection style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Filters</span>
                <img style={{ height: '1em', width: 'auto' }} alt="filter" src={FilterImage} />
            </FilterSection>
            <CheckboxGroup>
                <Checkbox label="Remote" onChange={onChange} type="remoteOnly" />
                <CountDisplay>{remoteJobsCount}</CountDisplay>
            </CheckboxGroup>
            <CheckboxGroup>
                <Checkbox
                    label="Open"
                    onChange={onChange}
                    checked={filters.response === 'Open'}
                    type="response"
                />
                <CountDisplay>{openSubmissionsCount}</CountDisplay>
            </CheckboxGroup>
            <FilterSection>Languages</FilterSection>
            {Object.keys(mainSkillsFrequencyMap)
                .sort()
                .map((key) => (
                    <CheckboxGroup key={key}>
                        <Checkbox label={key} onChange={onChange} type="skill" />
                        <CountDisplay>{mainSkillsFrequencyMap[key]}</CountDisplay>
                    </CheckboxGroup>
                ))}
            <FilterSection>Locations</FilterSection>
            {Object.keys(locationFrequencyMap)
                .sort()
                .map((key) => (
                    <CheckboxGroup key={key}>
                        <Checkbox label={key} onChange={onChange} type="location" />
                        <CountDisplay>{locationFrequencyMap[key]}</CountDisplay>
                    </CheckboxGroup>
                ))}
        </Layout>
    );
}

export default ApplicationFilter;
