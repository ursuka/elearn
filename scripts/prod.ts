import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const coursesData = [
  {
    title: "Spanish",
    code: "es",

    vocabulary: {
      man: "el hombre",
      woman: "la mujer",
      boy: "el chico",
      zombie: "el zombie",
      robot: "el robot",
      girl: "la niña",
    },
  },

  {
    title: "Romanian",
    code: "ro",

    vocabulary: {
      man: "bărbatul",
      woman: "femeia",
      boy: "băiatul",
      zombie: "zombie",
      robot: "robotul",
      girl: "fata",
    },
  },

  {
    title: "Russian",
    code: "ru",

    vocabulary: {
      man: "мужчина",
      woman: "женщина",
      boy: "мальчик",
      zombie: "зомби",
      robot: "робот",
      girl: "девочка",
    },
  },
];

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete existing data
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.userSubscription);

    for (const courseData of coursesData) {
      // Create course
      const [course] = await db
        .insert(schema.courses)
        .values({
          title: courseData.title,
          imageSrc: `/flags/${courseData.code}.svg`,
        })
        .returning();

      // Create units
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${courseData.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${courseData.title}`,
            order: 2,
          },
        ])
        .returning();

      for (const unit of units) {
        // Create lessons
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        for (const lesson of lessons) {
          // Create challenges
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          for (const challenge of challenges) {
            // Challenge 1
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.man,
                  imageSrc: `/options/${courseData.code}/img/man.svg`,
                  audioSrc: `/options/${courseData.code}/audio/man.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.woman,
                  imageSrc: `/options/${courseData.code}/img/woman.svg`,
                  audioSrc: `/options/${courseData.code}/audio/woman.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.boy,
                  imageSrc: `/options/${courseData.code}/img/boy.svg`,
                  audioSrc: `/options/${courseData.code}/audio/boy.mp3`,
                },
              ]);
            }

            // Challenge 2
            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.woman,
                  imageSrc: `/options/${courseData.code}/img/woman.svg`,
                  audioSrc: `/options/${courseData.code}/audio/woman.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.boy,
                  imageSrc: `/options/${courseData.code}/img/boy.svg`,
                  audioSrc: `/options/${courseData.code}/audio/boy.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.man,
                  imageSrc: `/options/${courseData.code}/img/man.svg`,
                  audioSrc: `/options/${courseData.code}/audio/man.mp3`,
                },
              ]);
            }

            // Challenge 3
            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.woman,
                  imageSrc: `/options/${courseData.code}/img/woman.svg`,
                  audioSrc: `/options/${courseData.code}/audio/woman.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.man,
                  imageSrc: `/options/${courseData.code}/img/man.svg`,
                  audioSrc: `/options/${courseData.code}/audio/man.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.boy,
                  imageSrc: `/options/${courseData.code}/img/boy.svg`,
                  audioSrc: `/options/${courseData.code}/audio/boy.mp3`,
                },
              ]);
            }

            // Challenge 4
            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.woman,
                  audioSrc: `/options/${courseData.code}/audio/woman.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.man,
                  audioSrc: `/options/${courseData.code}/audio/man.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.boy,
                  audioSrc: `/options/${courseData.code}/audio/boy.mp3`,
                },
              ]);
            }

            // Challenge 5
            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.man,
                  imageSrc: `/options/${courseData.code}/img/man.svg`,
                  audioSrc: `/options/${courseData.code}/audio/man.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.woman,
                  imageSrc: `/options/${courseData.code}/img/woman.svg`,
                  audioSrc: `/options/${courseData.code}/audio/woman.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.zombie,
                  imageSrc: `/options/${courseData.code}/img/zombie.svg`,
                  audioSrc: `/options/${courseData.code}/audio/zombie.mp3`,
                },
              ]);
            }

            // Challenge 6
            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.robot,
                  imageSrc: `/options/${courseData.code}/img/robot.svg`,
                  audioSrc: `/options/${courseData.code}/audio/robot.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.zombie,
                  imageSrc: `/options/${courseData.code}/img/zombie.svg`,
                  audioSrc: `/options/${courseData.code}/audio/zombie.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.boy,
                  imageSrc: `/options/${courseData.code}/img/boy.svg`,
                  audioSrc: `/options/${courseData.code}/audio/boy.mp3`,
                },
              ]);
            }

            // Challenge 7
            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.girl,
                  imageSrc: `/options/${courseData.code}/img/girl.svg`,
                  audioSrc: `/options/${courseData.code}/audio/girl.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.zombie,
                  imageSrc: `/options/${courseData.code}/img/zombie.svg`,
                  audioSrc: `/options/${courseData.code}/audio/zombie.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.man,
                  imageSrc: `/options/${courseData.code}/img/man.svg`,
                  audioSrc: `/options/${courseData.code}/audio/man.mp3`,
                },
              ]);
            }

            // Challenge 8
            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.woman,
                  audioSrc: `/options/${courseData.code}/audio/woman.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: courseData.vocabulary.zombie,
                  audioSrc: `/options/${courseData.code}/audio/zombie.mp3`,
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: courseData.vocabulary.boy,
                  audioSrc: `/options/${courseData.code}/audio/boy.mp3`,
                },
              ]);
            }
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();