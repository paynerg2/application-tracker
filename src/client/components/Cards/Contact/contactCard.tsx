import React from 'react';
import { Contact } from '../../../interfaces/contact';
import {
    Card,
    Email,
    Identity,
    Line,
    Name,
    Position,
    Company,
    Item,
    VerticalLine,
} from './contactCard.styles';

interface Props {
    contact: Contact;
    type: 'card' | 'item';
}

function ContactCard({ contact, type }: Props) {
    const { name, email, position, companyName } = contact;

    return (
        <>
            {type === 'item' ? (
                <Item key={email}>
                    <Identity>
                        <Name>{name}</Name>
                        <Email>{email}</Email>
                    </Identity>
                    <VerticalLine />
                    <Company>{companyName}</Company>
                </Item>
            ) : (
                <Card>
                    <Identity>
                        <Name>{name}</Name>
                        <Email>{email}</Email>
                    </Identity>
                    <Line />
                    <Position>{position}</Position>
                </Card>
            )}
        </>
    );
}

export default ContactCard;
