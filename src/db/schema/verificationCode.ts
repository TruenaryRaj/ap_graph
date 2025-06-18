import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const verificationCode = mysqlTable('verification_code', {
    id: int().primaryKey().autoincrement(),
    email: varchar({ length: 255}),
    code: varchar({ length: 255}),
    expiresAt: timestamp('expires_at')
})