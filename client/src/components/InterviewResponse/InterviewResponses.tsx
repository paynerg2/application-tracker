import React from 'react';
import { useTheme } from 'styled-components';
import { Interview, interviewResponseTypes } from '../../interfaces/interviews';
import { useEditInterviewMutation } from '../../services/api';
import { pixelStringToNumber } from '../../_helpers/stringHelpers';
import useWindowDimensions from '../../_helpers/useWindowDimensions';
import { List } from '../List/list';
import InterviewResponseItem from './InterviewResponseItem';
import InterviewResponseTable from './InterviewResponseTable';

interface Props {
    interviews: Interview[];
}

const InterviewResponses = ({ interviews }: Props) => {
    const { width } = useWindowDimensions();
    const theme = useTheme();
    const [updateInterview] = useEditInterviewMutation();

    const isMobile = () => {
        if (width !== null) {
            return width < pixelStringToNumber(theme.breakpoint.laptop);
        }
        return false;
    };

    const handleResponseChanged = async (
        response: typeof interviewResponseTypes[number],
        interview: Interview
    ) => {
        const _interview =
            interview.response === response
                ? { ...interview, response: interviewResponseTypes[0] }
                : { ...interview, response: response };
        await updateInterview(_interview).unwrap();
    };

    return (
        <>
            {!isMobile() ? (
                <InterviewResponseTable interviews={interviews} onChange={handleResponseChanged} />
            ) : (
                <List>
                    {interviews.map((interview) => (
                        <InterviewResponseItem
                            key={interview.id}
                            interview={interview}
                            onChange={handleResponseChanged}
                        />
                    ))}
                </List>
            )}
        </>
    );
};

export default InterviewResponses;
