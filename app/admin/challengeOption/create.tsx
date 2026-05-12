import { FC } from 'react'
import { BooleanInput, Create, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

const ChallengeOptionCreate: FC = () => {
    return (
        <Create>
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
        </Create>
    )
}

export default ChallengeOptionCreate
