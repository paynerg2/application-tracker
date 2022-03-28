import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { theme } from '../../app/theme/theme';

const SkeletonList = (props: IContentLoaderProps) => {
    const { radius } = theme.borders;
    return (
        <ContentLoader
            speed={2}
            width={'100%'}
            height={'40vh'}
            //viewBox="0 0 400 460"
            backgroundColor="#dedede"
            foregroundColor="#eceaea"
            {...props}
        >
            <rect x="0" y="0" rx={radius} width={'100%'} height={'100%'} />
        </ContentLoader>
    );
};

export default SkeletonList;
