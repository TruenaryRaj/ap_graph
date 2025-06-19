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
       const affected = (result as any)[0]?.affectedRows ?? 0;

        if (affected === 0) {
            return "user insert unsuccessful: invalid inputd" ;
        }
            return "user insert sucessful";
    },

    async editUser ( id: number, password: string ) {
        const result = await db.update(user).set({
            password: password
            }).where(eq(user.id , id));

        const affected = (result as any)[0]?.affectedRows ?? 0;

        if (affected === 0) {
        return "user edit unsuccessful: no user found" ;
        }
            return "user edit sucessful";
    },

    async deleteUser ( id: number) {
        const result = await db.delete(user).where(eq(user.id, id));
        const affected = (result as any)[0]?.affectedRows ?? 0;

        if (affected === 0) {
            return "user delete unsuccessful: no user found" ;
        }
            return "user delete sucessful";
    },

    async findUserByEmail ( email: string) {
        const result = await db.select().from(user).where(eq(user.email, email));
        return result;
    }
}