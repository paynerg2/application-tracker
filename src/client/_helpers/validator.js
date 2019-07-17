export const validateField = (fieldName, value, state) => {
    let expression;
    let { errors } = state;

    switch (fieldName) {
        //**************************************
        //         Application Fields
        //**************************************
        case 'jobDescriptionLink':
            // RegEX for a generic URL
            expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            const validUrlRegEx = new RegExp(expression);
            if (value) {
                errors.jobDescriptionLink = validUrlRegEx.test(value)
                    ? ''
                    : 'Link is not valid';
            } else {
                errors.jobDescriptionLink = '';
            }
            break;
        case 'requiredSkillsTotal':
            if (value) {
                errors.requiredSkills =
                    value >= 0 ? '' : 'Value cannot be negative';
            }
            break;
        case 'requiredSkillsMet':
            // Value greater than total should supercede a negative value
            // since a negative value should count as both.
            if (value) {
                errors.requiredSkills =
                    value >= 0 ? '' : 'Value cannot be negative';
                errors.requiredSkills =
                    value <= state.requiredSkillsTotal
                        ? ''
                        : 'Value must be less than the total';
            }
            break;
        case 'additionalSkillsTotal':
            if (value) {
                errors.additionalSkills =
                    value >= 0 ? '' : 'Value cannot be negative';
            }
            break;
        case 'additionalSkillsMet':
            // Value greater than total should supercede a negative value
            // since a negative value should count as both.
            if (value) {
                errors.additionalSkills =
                    value >= 0 ? '' : 'Value cannot be negative';
                errors.additionalSkills =
                    value <= state.additionalSkillsTotal
                        ? ''
                        : 'Value must be less than the total';
            }
            break;
        case 'yearsOfExperience':
            errors.yearsOfExperience =
                value >= 0 ? '' : 'Value cannot be negative';
            break;
        case 'datePosted':
        case 'dateApplicationSent':
            // set up values as date types for comparison, accounting for timezone offset.
            const { dateApplicationSent, datePosted } = state;
            const today = new Date();
            const valueAsDate = getTimeZoneCorrectedDate(value);
            let sent =
                dateApplicationSent &&
                getTimeZoneCorrectedDate(dateApplicationSent);
            let posted = datePosted && getTimeZoneCorrectedDate(datePosted);

            // Errors for date values split into subcategories
            //  - to prevent overwriting individual error messages
            //  - to give better feedback to the user.
            if (sent && posted) {
                if (fieldName === 'datePosted') {
                    posted = valueAsDate;
                } else {
                    sent = valueAsDate;
                }

                const errorMessage =
                    sent < posted
                        ? 'Cannot submit application before post exists'
                        : '';

                errors[`datePostedRelativeDate`] = errorMessage;
                errors[`dateApplicationSentRelativeDate`] = errorMessage;
            }

            errors[`${fieldName}Date`] =
                valueAsDate > today ? 'Value cannot be from the future' : '';

            break;
        case 'companyLinkedIn':
            // must be a valid LinkedIn URL
            if (value) {
                expression = /^((https?|chrome):\/\/)?(www\.)?(linkedin.com)\/(company).[^\s]*$/gi;
                const validCompanyLinkedInUrlRegEx = new RegExp(expression);
                errors.companyLinkedIn = validCompanyLinkedInUrlRegEx.test(
                    value
                )
                    ? ''
                    : 'Not a valid company LinkedIn';
            }
            break;
        case 'expectedSalary':
            if (value) {
                errors.expectedSalary =
                    value >= 0 ? '' : 'Value cannot be negative';
            }
            break;

        //**************************************
        //         Application Fields
        //**************************************

        case 'offer':
            if (value) {
                errors.offer = value > 0 ? '' : 'Value cannot be negative';
            }
            break;
        case 'round':
            if (value) {
                errors.round = value >= 1 ? '' : 'Value cannot be less than 1';
            }
            break;
        default:
            break;
    }

    return errors;
};

export const validateForm = errors => {
    let valid = true;
    for (let key in errors) {
        if (errors[key]) {
            valid = false;
        }
    }
    return valid;
};

function getTimeZoneCorrectedDate(value) {
    let valueAsDate = new Date(value);
    valueAsDate.setMinutes(
        valueAsDate.getMinutes() + valueAsDate.getTimezoneOffset()
    );
    return valueAsDate;
}
