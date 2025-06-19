import { todo } from "../db/schema/todo";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const todoServices = {
    async getTodo (userId: number) {
        const result = await db.select().from(todo).where(eq(todo.userId, userId));
        return result;
    },

    async addTodo (title: string, description: string, userId: number) {
        console.log(userId);
        const result = await db.insert(todo).values({
            title,
            description,
            userId
        })
        const affected = (result as any)[0]?.affectedRows ?? 0;

        if (affected === 0) {
        return "todo creation unsuccessful: invalid input" ;
        }
            return "todo creation sucessful";
    },

    async editTodo ( id: number, title: string, description: string, userId: number) {
        const result = await db.update(todo).set({
            title: title,
            description: description,
            userId: userId
        }).where(eq(todo.userId,userId));
        const affected = (result as any)[0]?.affectedRows ?? 0;

        if (affected === 0) {
        return "todo edit unsuccessful: no todo found" ;
        }
            return "todo edit sucessful";
    },

    async deleteTodo( id: number)
    {
        const result = await db.delete(todo).where(eq(todo.id, id));
        const affected = (result as any)[0]?.affectedRows ?? 0;

        if (affected === 0) {
        return "todo delete unsuccessful: no todo found" ;
        }
            return "todo delete sucessful";
    }
}