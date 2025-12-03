import db from "@/db"

async function seedUser() {
    const user = await db.user.create({
        data: {
            username: "testuser",
            name: "User One",
            email: "testuser@example.com",
            password: "test123",
            refreshToken: "random string",
            timeZone: "IST"
        }
    })

    return user;
}

async function seedHabit(userId: number) {
    await db.habit.create({
        data: {
            title: "Habit 1",
            description: "About the habit",
            goal: "A goal",
            frequency: "DAILY",
            reminderTime: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            personality: "calm",
            emailStyle: "friendly",
            userId: userId
        }
    })
}

async function seedDatabase() {
    try {
        const user = await seedUser();
        await seedHabit(user.id);

        console.log("Database seeded successfully !!")
    } catch (error) {
        console.error("Error seeding database : ", error);
        throw error
    } finally {
        await db.$disconnect();
    }
}

seedDatabase().catch((err) => {
    console.error("An unexpected error occurred during seeding the db : ", err);
    process.exit(1);
})