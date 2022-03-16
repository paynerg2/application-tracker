import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/input';
import { Error } from '../../components/Form/form';
import Button from '../../components/Button/button';
import { StyledInput, Label } from '../../components/Input/input';
import { theme } from '../../app/theme/theme';
import { useParams } from 'react-router-dom';
import { getDateFormattedForDatetimeLocalInput } from '../../_helpers/dateFormatter';

interface Props {
    register: any;
    errors: any;
    isValid: boolean;
}

const SmallInput = styled(StyledInput)`
    width: 4em;
    text-align: center;
`;

const TwoColumnFormInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: min-content;
    margin-bottom: 1vh;
`;

const MinorLabel = styled(Label)`
    color: ${theme.color.lightGray};
    margin-left: 2vw;
`;

type Params = {
    id?: string | undefined;
};

function Step3({ register, errors, isValid }: Props) {
    const { id } = useParams<Params>();

    const getSkillsError = (type: 'additional' | 'required') => {
        if (errors[`${type}SkillsRequired`]) {
            return errors[`${type}SkillsRequired`].message;
        }
        if (errors[`${type}SkillsMet`]) {
            return errors[`${type}SkillsMet`].message;
        }
        return '';
    };

    return (
        <>
            <Input
                id="datePosted"
                label="When was the job listed?"
                register={register}
                required
                type="datetime-local"
            />
            <Error>{errors.datePosted && errors.datePosted.message}</Error>
            <Input
                id="dateApplicationSent"
                label="When did you apply?"
                register={register}
                required
                type="datetime-local"
            />
            <Error>{errors.dateApplicationSent && errors.dateApplicationSent.message}</Error>
            <TwoColumnFormInput>
                <Label>How many required skills are listed?</Label>
                <SmallInput
                    name="requiredSkillsTotal"
                    id="requiredSkillsTotal"
                    {...register('requiredSkillsTotal')}
                    type="number"
                    defaultValue={0}
                ></SmallInput>
            </TwoColumnFormInput>
            <TwoColumnFormInput>
                <MinorLabel>How many of these do you have?</MinorLabel>
                <SmallInput
                    name="requiredSkillsMet"
                    id="requiredSkillsMet"
                    {...register('requiredSkillsMet')}
                    type="number"
                    defaultValue={0}
                ></SmallInput>
            </TwoColumnFormInput>
            <Error>{getSkillsError('required')}</Error>
            <TwoColumnFormInput>
                <Label>How many additional skills are listed?</Label>
                <SmallInput
                    name="additionalSkillsTotal"
                    id="additionalSkillsTotal"
                    {...register('additionalSkillsTotal')}
                    type="number"
                    defaultValue={0}
                ></SmallInput>
            </TwoColumnFormInput>
            <TwoColumnFormInput>
                <MinorLabel>How many of these do you have?</MinorLabel>
                <SmallInput
                    name="additionalSkillsMet"
                    id="additionalSkillsMet"
                    {...register('additionalSkillsMet')}
                    type="number"
                    defaultValue={0}
                ></SmallInput>
            </TwoColumnFormInput>
            <Error>{getSkillsError('additional')}</Error>

            <Button disabled={!isValid} type="submit">{`Finish ${
                id ? 'Editing' : 'Adding'
            } Application`}</Button>
        </>
    );
}

export default Step3;
