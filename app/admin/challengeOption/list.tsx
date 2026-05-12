import { FC } from 'react'
import { BooleanField, Datagrid, List, ReferenceField, TextField } from 'react-admin'

const ChallengeOptionList: FC = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField
                    source='id'
                />
                <TextField
                    source='text'
                />
                <BooleanField
                    source='correct'
                />
                <ReferenceField
                    source='challengeId'
                    reference='challenges'
                />
                <TextField
                    source='imageSrc'
                />
                <TextField
                    source='audioSrc'
                />
            </Datagrid>
        </List>
    )
}

export default ChallengeOptionList
