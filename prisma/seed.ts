import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.OrganizationCreateInput[] = [
    {
        name: 'Techtorch',
        users: {
            create: [
                {
                    name: "Kyryl",
                    role: "ADMIN",
                    email: "kyryl@bogach.es"
                },
                {
                    name: "Victor",
                    role: "ADMIN",
                    email: "victor@gmail.com"
                },
                {
                    name: "Editor",
                    role: "EDITOR",
                    email: "editor@google.es"
                },
                {
                    name: "Viewer",
                    role: "VIEWER",
                    email: "random@who.es"
                },
                {
                    name: "Editor 2",
                    role: "EDITOR",
                    email: "editor2@google.es"
                },
                {
                    name: "Viewer 2",
                    role: "VIEWER",
                    email: "random2@who.es"
                },
            ],
        },
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const organization = await prisma.organization.create({
            data: u,
        })
        console.log(`Created organization with id: ${ organization.id }`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
