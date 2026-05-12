import { FC } from 'react'
import { BooleanInput, Edit, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

const ChallengeOptionEdit: FC = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput
                    source='text'
                    validate={[required()]}
                    label="text"
                />
                <BooleanInput
                    source='correct'
                    label="Correct option"
                />
                <ReferenceInput
                    source='challengeId'
                    reference='challenges'
                />
                <TextInput
                    source="imageSrc"
                    label="Image URL"
                />
                <TextInput
                    source='audioSrc'
                    label="Audio URL"
                />
            </SimpleForm>
        </Edit>
    )
}

export default ChallengeOptionEdit
