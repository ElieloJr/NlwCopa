import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const user =  await prisma.user.create({
        data: {
            nome: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/ElieloJr.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T13:00:00.769Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T13:00:00.769Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 0,
                    secondTeamPoints: 2,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()