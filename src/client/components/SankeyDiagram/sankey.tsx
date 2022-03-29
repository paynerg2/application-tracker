import React from 'react';
import { ResponsiveSankey, DefaultNode, DefaultLink } from '@nivo/sankey';

export interface SankeyData {
    nodes: DefaultNode[];
    links: DefaultLink[];
}
interface Props {
    data: SankeyData;
    getColor: (id: string) => string;
}

const Sankey = ({ data, getColor }: Props) => {
    return (
        <ResponsiveSankey
            data={data}
            sort="ascending"
            align="center"
            colors={(node) => getColor(node.id)}
            nodeOpacity={1}
            nodeHoverOthersOpacity={0.35}
            nodeThickness={4}
            nodeSpacing={30}
            nodeBorderWidth={4}
            nodeBorderColor={{
                from: 'color',
                modifiers: [['darker', 0.8]],
            }}
            nodeBorderRadius={2}
            linkOpacity={0.8}
            linkHoverOthersOpacity={0.1}
            enableLinkGradient={true}
            labelPosition="inside"
            labelOrientation="horizontal"
            labelPadding={10}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
            }}
        />
    );
};

export default Sankey;
