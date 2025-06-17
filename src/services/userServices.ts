import { eq } from "drizzle-orm";
import { user } from '../db/schema/user';
import { db } from '../db';

export const userServices = {

    async getUser () {
        const result = await db.select().from(user);
        return result;
    },
    
    async addUser ( email: string, password: string ) {
        const result = await db.insert(user).values({
            email,
            password
        })
        if(result == null) return "input unsucessful"
        return "input sucessful";
    },

    async editUser ( id: number, password: string ) {
        const result = await db.update(user).set({
            password: password
        }).where(eq(user.id , id));
        if(result == null) return "edit unsucessful"
        return "edit sucessful";
    },

    async deleteUser ( id: number) {
        const result = await db.delete(user).where(eq(user.id, id));
        return result;
    },

    async findUserByEmail ( email: string) {
        const result = await db.select().from(user).where(eq(user.email, email));
        return result;
    }
}