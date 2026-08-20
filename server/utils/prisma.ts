// import { PrismaLibSql } from '@prisma/adapter-libsql';
// import { PrismaClient } from '../../generated/prisma/client';

// let _prisma: InstanceType<typeof PrismaClient>;

// export const usePrisma = () => {
//     if (!_prisma) {
//         const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? 'file:./dev.db' });
//         _prisma = new PrismaClient({ adapter });
//     }
//     return _prisma;
// }



import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

let _prisma: InstanceType<typeof PrismaClient>;

export const usePrisma = () => {
    if (!_prisma) {
        const adapter = new PrismaPg({
            connectionString:
                process.env.DATABASE_URL ??
                'postgresql://realworld:realworldpass@localhost:5432/realworld',
        });

        _prisma = new PrismaClient({ adapter });
    }

    return _prisma;
};


