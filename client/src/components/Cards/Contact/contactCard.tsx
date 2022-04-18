import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../../../interfaces/contact';
import { useDeleteContactMutation } from '../../../services/api';
import {
    Card,
    Email,
    Identity,
    Divider,
    Name,
    Position,
    Company,
    Item,
    VerticalLine,
} from './contactCard.styles';
import ActionAccordion from '../../../components/ActionAccordion/ActionAccordion';

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

    const handleEdit = () => navigate(`/contacts/edit/${id}`);

    return (
        <>
            {type === 'item' ? (
                <ActionAccordion isOpen={isOpen} edit={handleEdit} onDelete={handleDelete}>
                    {/* @ts-ignore */}
                    <Item key={email} isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
                        <Identity>
                            <Name>{name}</Name>
                            <Email>{email}</Email>
                            {phone && <Email>{phone}</Email>}
                        </Identity>
                        <Divider />
                        <Company>{company}</Company>
                    </Item>
                    {/* {getActionButtons()} */}
                </ActionAccordion>
            ) : (
                <ActionAccordion isOpen={isOpen} edit={handleEdit} onDelete={handleDelete}>
                    {/* @ts-ignore */}
                    <Card onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
                        <Identity>
                            <Name>{name}</Name>
                            <Email>{email}</Email>
                        </Identity>
                        <Divider />
                        <Position>{position}</Position>
                    </Card>
                </ActionAccordion>
            )}
        </>
    );
}

export default ContactCard;
