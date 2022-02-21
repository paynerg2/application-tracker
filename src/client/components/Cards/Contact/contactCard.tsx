import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../../../interfaces/contact';
import { useDeleteContactMutation } from '../../../services/api';
import TextButton from '../../TextButton/textButton';
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
    Actions,
} from './contactCard.styles';

interface Props {
    contact: Contact;
    type: 'card' | 'item';
}

function ContactCard({ contact, type }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [deleteContact] = useDeleteContactMutation();

    const { name, email, position, company, phone, id } = contact;

    const handleDelete = async () => {
        await deleteContact(id!);
    };

    const getActionButtons = () => {
        return (
            // @ts-ignore
            <Actions isOpen={isOpen}>
                <TextButton color="primary" onClick={() => navigate(`/contacts/edit/${id}/1`)}>
                    Edit
                </TextButton>
                <TextButton color="destructive" onClick={handleDelete}>
                    Delete
                </TextButton>
            </Actions>
        );
    };

    return (
        <>
            {type === 'item' ? (
                <>
                    {/* @ts-ignore */}
                    <Item key={email} isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
                        <Identity>
                            <Name>{name}</Name>
                            <Email>{email}</Email>
                            {phone && <Email>{phone}</Email>}
                        </Identity>
                        <VerticalLine />
                        <Company>{company}</Company>
                    </Item>
                    {getActionButtons()}
                </>
            ) : (
                <>
                    {/* @ts-ignore */}
                    <Card onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
                        <Identity>
                            <Name>{name}</Name>
                            <Email>{email}</Email>
                        </Identity>
                        <Line />
                        <Position>{position}</Position>
                    </Card>
                    {getActionButtons()}
                </>
            )}
        </>
    );
}

export default ContactCard;
