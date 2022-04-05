import React from 'react';
import { ResponsiveTimeRange, CalendarDatum } from '@nivo/calendar';
import { theme } from '../../app/theme/theme';

interface Props {
    data: CalendarDatum[];
    from: string;
    to: string;
}

const Calendar = ({ data, from, to }: Props) => {
    const { backgroundStripe, primary, skyBlue } = theme.color;

    return (
        <ResponsiveTimeRange
            data={data}
            from={new Date(from)}
            to={new Date(to)}
            colors={[backgroundStripe, primary, skyBlue]}
            margin={{ top: 30, right: 10, bottom: 10, left: 60 }}
            emptyColor={'#eee'}
            monthLegendPosition="before"
            dayBorderWidth={2}
            dayBorderColor={'#fff'}
            legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'row',
                    translateY: 0,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left',
                },
            ]}
        />
    );
};

export default Calendar;
