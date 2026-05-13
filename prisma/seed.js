const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // 1. Create Admin
    await prisma.user.upsert({
        where: { email: 'admin@getmygit.com' },
        update: {},
        create: {
            email: 'admin@getmygit.com',
            name: 'System Admin',
            password,
            role: 'ADMIN',
        },
    });

    // 2. Create Developer
    await prisma.user.upsert({
        where: { email: 'dev@getmygit.com' },
        update: {},
        create: {
            email: 'dev@getmygit.com',
            name: 'John Developer',
            password,
            role: 'DEVELOPER',
        },
    });

    // 3. Create Reviewer
    await prisma.user.upsert({
        where: { email: 'reviewer@getmygit.com' },
        update: {},
        create: {
            email: 'reviewer@getmygit.com',
            name: 'Sarah Reviewer',
            password,
            role: 'REVIEWER',
        },
    });

    console.log('Seed completed: Default users created.');
    console.log('Admin: admin@getmygit.com / password123');
    console.log('Developer: dev@getmygit.com / password123');
    console.log('Reviewer: reviewer@getmygit.com / password123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
