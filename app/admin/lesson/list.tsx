import { FC } from 'react'
import { Datagrid, List, NumberField, ReferenceField, TextField } from 'react-admin'

const LessonList: FC = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField
                    source='id'
                />
                <TextField
                    source='title'
                />
                <ReferenceField
                    source='unitId'
                    reference='units'
                />
                <NumberField
                    source='order'
                />
            </Datagrid>
        </List>
    )
}

export default LessonList
