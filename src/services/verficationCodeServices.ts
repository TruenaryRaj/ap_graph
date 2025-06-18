import { db } from "../db";
import { verificationCode } from "../db/schema/verificationCode";
import { eq } from "drizzle-orm";

export const verficationCodeServices = {

    async insertCode(email: string, code: string) {
        const result = await db.insert(verificationCode).values({
            email,
            code,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })
        return result;
    },

    async verifyCode(code: string) {
        const result = await db.select().from(verificationCode).where(eq(verificationCode.code, code));
        return result;
    },

    async deleteCode(code: string) {
        await db.delete(verificationCode).where(eq(verificationCode.code, code));
    }
}