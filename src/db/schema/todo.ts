import { mysqlTable,int, varchar } from "drizzle-orm/mysql-core";
import { user } from "./user";


export const todo = mysqlTable('todo', ({
   id: int().primaryKey().autoincrement(),
    title: varchar({ length: 255}),
    description: varchar({ length: 255}),
    userId: int('user_id').notNull().references(() => user.id)
}));