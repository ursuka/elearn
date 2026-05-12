"use client"

import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import CourseList from './course/list';
import CourseCreate from './course/create';
import CourseEdit from './course/edit';

import UnitList from './unit/list';
import UnitCreate from './unit/create';
import UnitEdit from './unit/edit';

import LessonCreate from './lesson/create';
import LesssonEdit from './lesson/edit';
import LessonList from './lesson/list';

import ChallengeList from './challenge/list';
import ChallengeCreate from './challenge/create';
import ChallengeEdit from './challenge/edit';
import ChallengeOptionCreate from './challengeOption/create';
import ChallengeOptionEdit from './challengeOption/edit';
import ChallengeOptionList from './challengeOption/list';

const dataProvider = simpleRestProvider('/api');

const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="courses"
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation='title'
                list={CourseList}
            />
            <Resource
                name="units"
                create={UnitCreate}
                edit={UnitEdit}
                recordRepresentation='title'
                list={UnitList}
            />
            <Resource
                name="lessons"
                create={LessonCreate}
                edit={LesssonEdit}
                recordRepresentation='title'
                list={LessonList}
            />
            <Resource
                name="challenges"
                create={ChallengeCreate}
                edit={ChallengeEdit}
                recordRepresentation='question'
                list={ChallengeList}
            />
            <Resource
                name="challengeOptions"
                create={ChallengeOptionCreate}
                edit={ChallengeOptionEdit}
                recordRepresentation='text'
                list={ChallengeOptionList}
                options={{label: "Challenge Options"}}
            />
        </Admin>
    )
}

export default App;
