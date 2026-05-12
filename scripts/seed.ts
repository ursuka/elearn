import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const LANG_LIST: typeof schema.courses.$inferInsert[] = [
    {
        id: 1,
        title: 'Spanish',
        imageSrc: '/flags/es.svg'
    },
    {
        id: 2,
        title: 'Chinese',
        imageSrc: '/flags/cn.svg'
    },
    {
        id: 3,
        title: 'German',
        imageSrc: '/flags/de.svg'
    },
    {
        id: 4,
        title: 'French',
        imageSrc: '/flags/fr.svg'
    },
    {
        id: 5,
        title: 'English',
        imageSrc: '/flags/gb.svg'
    },
    {
        id: 6,
        title: 'Italian',
        imageSrc: '/flags/it.svg'
    },
    {
        id: 7,
        title: 'Japanese',
        imageSrc: '/flags/jp.svg'
    },
    {
        id: 8,
        title: 'Korean',
        imageSrc: '/flags/kr.svg'
    },
    {
        id: 9,
        title: 'Romanian',
        imageSrc: '/flags/ro.png'
    },
    {
        id: 10,
        title: 'Russian',
        imageSrc: '/flags/ru.svg'
    },
]

const UNITS_LIST: typeof schema.units.$inferInsert[] = [
    {
        id: 1,
        courseId: 1, // spanish
        title: 'Basics 1',
        description: 'Learn the basics of Spanish, including common phrases and vocabulary.',
        order: 1
    }
]

const LESSONS_LIST: typeof schema.lessons.$inferInsert[] = [
    {
        id: 1,
        unitId: 1, // Spanish/Basics 1
        order: 1,
        title: 'Nouns'
    },
    {
        id: 2,
        unitId: 1, // Spanish/Basics 1
        order: 2,
        title: 'Nouns 2'
    },
    {
        id: 3,
        unitId: 1, // Spanish/Basics 1
        order: 3,
        title: 'Verbs'
    },
    {
        id: 4,
        unitId: 1, // Spanish/Basics 1
        order: 4,
        title: 'Verbs 2'
    },
    {
        id: 5,
        unitId: 1, // Spanish/Basics 1
        order: 5,
        title: 'Verbs 3'
    },
];

const CHALLENGE_LIST: typeof schema.challenges.$inferInsert[] = [
    {
        id: 1,
        lessonId: 1, // Spanish/Basics 1/Nouns
        type: 'SELECT',
        question: "How do you say 'Apple' in Spanish?",
        order: 1
    },
    {
        id: 2,
        lessonId: 1, // Spanish/Basics 1/Nouns
        type: 'ASSIST',
        question: "'Apple'",
        order: 2
    },
    {
        id: 3,
        lessonId: 1, // Spanish/Basics 1/Nouns
        type: 'SELECT',
        question: "How do you say 'Orange' in Spanish?",
        order: 3
    },
    {
        id: 4,
        lessonId: 2, // Spanish/Basics 1/Nouns
        type: 'SELECT',
        question: "How do you say 'Water' in Spanish?",
        order: 1
    },
    {
        id: 5,
        lessonId: 2, // Spanish/Basics 1/Nouns
        type: 'ASSIST',
        question: "'Water'",
        order: 2
    },
    {
        id: 6,
        lessonId: 2, // Spanish/Basics 1/Nouns
        type: 'SELECT',
        question: "How do you say 'Water' in Spanish?",
        order: 3
    },
]

const CHALLENGE_OPTIONS_LIST: typeof schema.challengeOptions.$inferInsert[] = [
    {
        challengeId: 1, // Spanish/Basics 1/Nouns/How do you say 'Apple' in Spanish?
        text: 'Manzana',
        correct: true,
        imageSrc: '/options/es/img/apple.svg',
        audioSrc: '/options/es/audio/apple.mp3',
    },
    {
        challengeId: 1, // Spanish/Basics 1/Nouns/How do you say 'Apple' in Spanish?
        text: 'Pera',
        correct: false,
        imageSrc: '/options/es/img/pear.svg',
        audioSrc: '/options/es/audio/pear.mp3',
    },
    {
        challengeId: 1, // Spanish/Basics 1/Nouns/How do you say 'Apple' in Spanish?
        text: 'Naranja',
        correct: false,
        imageSrc: '/options/es/img/orange.svg',
        audioSrc: '/options/es/audio/orange.mp3',
    },
    {
        challengeId: 2, // Spanish/Basics 1/Nouns/'Apple'?
        text: 'Manzana',
        correct: true,
        audioSrc: '/options/es/audio/apple.mp3',
    },
    {
        challengeId: 2, // Spanish/Basics 1/Nouns/'Apple'?
        text: 'Pera',
        correct: false,
        audioSrc: '/options/es/audio/pear.mp3',
    },
    {
        challengeId: 2, // Spanish/Basics 1/Nouns/'Apple'?
        text: 'Naranja',
        correct: false,
        audioSrc: '/options/es/audio/orange.mp3',
    },
    {
        challengeId: 3, // Spanish/Basics 1/Nouns/How do you say 'Orange' in Spanish?
        text: 'Manzana',
        correct: false,
        imageSrc: '/options/es/img/apple.svg',
        audioSrc: '/options/es/audio/apple.mp3',
    },
    {
        challengeId: 3, // Spanish/Basics 1/Nouns/How do you say 'Orange' in Spanish?
        text: 'Pera',
        correct: false,
        imageSrc: '/options/es/img/pear.svg',
        audioSrc: '/options/es/audio/pear.mp3',
    },
    {
        challengeId: 3, // Spanish/Basics 1/Nouns/How do you say 'Orange' in Spanish?
        text: 'Naranja',
        correct: true,
        imageSrc: '/options/es/img/orange.svg',
        audioSrc: '/options/es/audio/orange.mp3',
    },
    {
        challengeId: 4, // Spanish/Basics 1/Nouns 2/How do you say 'Water' in Spanish?
        text: 'Agua',
        correct: true,
        imageSrc: '/options/es/img/water.svg',
        audioSrc: '/options/es/audio/water.mp3',
    },
    {
        challengeId: 4, // Spanish/Basics 1/Nouns 2/How do you say 'Water' in Spanish?
        text: 'Leche',
        correct: false,
        imageSrc: '/options/es/img/milk.svg',
        audioSrc: '/options/es/audio/milk.mp3',
    },
    {
        challengeId: 4, // Spanish/Basics 1/Nouns 2/How do you say 'Water' in Spanish?
        text: 'Jugo',
        correct: false,
        imageSrc: '/options/es/img/juice.svg',
        audioSrc: '/options/es/audio/juice.mp3',
    },
    {
        challengeId: 5, // Spanish/Basics 1/Nouns 2/'Water'?
        text: 'Agua',
        correct: true,
        audioSrc: '/options/es/audio/water.mp3',
    },
    {
        challengeId: 5, // Spanish/Basics 1/Nouns 2/'Water'?
        text: 'Leche',
        correct: false,
        audioSrc: '/options/es/audio/milk.mp3',
    },
    {
        challengeId: 5, // Spanish/Basics 1/Nouns 2/'Water'?
        text: 'Jugo',
        correct: false,
        audioSrc: '/options/es/audio/juice.mp3',
    },
    {
        challengeId: 6, // Spanish/Basics 1/Nouns 2/How do you say 'Water' in Spanish?
        text: 'Agua',
        correct: true,
        imageSrc: '/options/es/img/water.svg',
        audioSrc: '/options/es/audio/water.mp3',
    },
    {
        challengeId: 6, // Spanish/Basics 1/Nouns 2/How do you say 'Water' in Spanish?
        text: 'Leche',
        correct: false,
        imageSrc: '/options/es/img/milk.svg',
        audioSrc: '/options/es/audio/milk.mp3',
    },
    {
        challengeId: 6, // Spanish/Basics 1/Nouns 2/How do you say 'Water' in Spanish?
        text: 'Jugo',
        correct: false,
        imageSrc: '/options/es/img/juice.svg',
        audioSrc: '/options/es/audio/juice.mp3',
    }

];

const main = async () => {
    try {
        console.log('Seeding database...');

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values(LANG_LIST);
        await db.insert(schema.units).values(UNITS_LIST);
        await db.insert(schema.lessons).values(LESSONS_LIST);
        await db.insert(schema.challenges).values(CHALLENGE_LIST);
        await db.insert(schema.challengeOptions).values(CHALLENGE_OPTIONS_LIST);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}


main()