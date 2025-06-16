
import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable( 'user', {
    id: int().primaryKey().autoincrement(),
    email: varchar({ length: 255}),
    password: varchar({ length: 255})
})