import { FC } from 'react'
import { Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

const UnitCreate: FC = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source='title'
                    validate={[required()]}
                    label="Title"
                />
                <TextInput
                    source='description'
                    validate={[required()]}
                    label="Desctiption"
                />
                <ReferenceInput
                    source='courseId'
                    reference='courses'
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

export default UnitCreate
