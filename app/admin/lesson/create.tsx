import { FC } from 'react'
import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

const LessonCreate: FC = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source='title'
                    validate={[required()]}
                    label="Title"
                />
                <ReferenceInput
                    source='unitId'
                    reference='units'
                />
                <NumberInput
                    source='order'
                    validate={[required()]}
                    label="Order"
                />
            </SimpleForm>
        </Create>
    )
}

export default LessonCreate
