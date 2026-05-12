import { FC } from 'react'
import { Edit, NumberInput, ReferenceInput, required, SimpleForm, TextInput } from 'react-admin'

const LesssonEdit: FC = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput
                    source='id'
                    validate={[required()]}
                    label="Id"
                />
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
        </Edit>
    )
}

export default LesssonEdit
