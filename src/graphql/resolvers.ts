import { eq } from "drizzle-orm";
import { user } from '../db/schema';
import { db } from '../db';
import { misplacedDirectiveMessage } from "graphql/validation/rules/KnownDirectives";
export const resolvers = {
  Query: {
    getUser: async () => {
        const result = await db.select().from(user);
        return result;
    },
 },
    Mutation: {
       addUser: async (_: any, args: { email: string, password: string }) => {
            const { email, password } = args;

            const index = await db.insert(user).values({ email, password }).$returningId();

            if (index == null) return 'Failed to add user';
            return 'User added successfully';
        },

        editUser: async (_: any, args: {id: number, email: string, password: string}) => {
            const { id, email, password } = args ;
            const updated = await db.update(user).set({
                email: email,
                password: password
            }).where(eq(user.id,args.id));
            if( updated == null) return 'failed to update user';
            return 'user edited scuessfully';

        },

        deleteUser: async (_: any, args: { id: number}) => {
         const result = await db.delete(user).where(eq(user.id, args.id));
         if ( result == null) return 'process unsucessfull';
         return 'deleted sucessfully'
        }
    }
 
};
