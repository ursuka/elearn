import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable('courses', {
    id: serial('id').primaryKey(), // exemple id: 1
    title: text('title').notNull(), // exemple title: "Spanish"
    imageSrc: text('image_src').notNull(), // exemple imageSrc: "/flags/es.svg"
});

export const coursesRelations = relations(courses, (({ many }) => ({
    userProgress: many(userProgress),
    units: many(units)
})))

export const units = pgTable('units', {
    id: serial('id').primaryKey(), // exemple id: 1
    title: text('title').notNull(), // exemple title: "Basics 1"
    description: text('description').notNull(), // exemple description: "Learn the basics of Spanish, including common phrases and vocabulary."
    courseId: integer('course_id').references(() => courses.id, { onDelete: 'cascade' }).notNull(), // exemple courseId: 1
    order: integer('order').notNull(), // exemple order: 1
});

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons)
}))

export const lessons = pgTable('lessons', {
    id: serial('id').primaryKey(), // exemple id: 1
    title: text('title').notNull(), // exemple title: "Greetings"
    unitId: integer('unit_id').references(() => units.id, { onDelete: 'cascade' }).notNull(), // exemple unitId: 1
    order: integer('order').notNull(), // exemple order: 1
})

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges)
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable('challenges', {
    id: serial('id').primaryKey(), // exemple id: 1
    lessonId: integer('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }).notNull(), // exemple lessonId: 1
    type: challengesEnum('type').notNull(), // exemple type: "SELECT"
    question: text('question').notNull(), // exemple question: "How do you say 'Hello' in Spanish?"
    order: integer('order').notNull(), // exemple order: 1
})

export const challengesRalations = relations(challenges, ({ one, many }) => ({
    lessons: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress)
}))

export const challengeOptions = pgTable('challenge_options', {
    id: serial('id').primaryKey(), // exemple id: 1
    challengeId: integer('challenge_id').references(() => challenges.id, { onDelete: 'cascade' }).notNull(), // exemple challengeId: 1
    text: text('text').notNull(), // exemple text: "Hello"
    correct: boolean('correct').notNull(), // exemple correct: true
    imageSrc: text('image_src'), // exemple imageSrc: "/options/hello.png"
    audioSrc: text('audio_src'), // exemple audioSrc: "/options/hello.mp3"
})

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}))

export const challengeProgress = pgTable('challenge_progress', {
    id: serial('id').primaryKey(), // exemple id: 1
    userId: text('user_id').notNull(), // exemple userId: "clerk|1234567890"
    challengeId: integer('challenge_id').references(() => challenges.id, { onDelete: 'cascade' }).notNull(), // exemple challengeId: 1
    completed: boolean('completed').notNull().default(false), // exemple completed: true
})

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}))

export const userProgress = pgTable('user_progress', {
    user_id: text('user_id').primaryKey(), // exemple user_id: "clerk|1234567890"
    user_name: text('user_name').notNull().default('User'), // exemple user_name: "John Doe"
    userImageSrc: text('user_image_src').notNull().default('https://api.dicebear.com/9.x/glass/svg'), // exemple userImageSrc: "https://example.com/user-avatar.jpg"
    active_course_id: integer('active_course_id').references(() => courses.id, { onDelete: 'cascade' }), // exemple active_course_id: 1
    hearts: integer("hearts").notNull().default(5), // exemple hearts: 5
    points: integer("points").notNull().default(0), // exemple points: 100
})

export const userProgressRelations = relations(userProgress, (({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.active_course_id],
        references: [courses.id]
    })
})));

export const userSubscription = pgTable("user_subscription", {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().unique(),
    stripeCustomerId: text('stripe_customer_id').notNull().unique(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
    stripePriceId: text("stripe_price_id").notNull(),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});