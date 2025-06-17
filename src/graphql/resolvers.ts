import { userServices } from "../services/userServices";
import bcrypt from 'bcrypt';
import { generateToken } from "../auth/auth.services";
import { todoServices } from "../services/todoServices";


export const resolvers = {
  Query: {
    getTodo: async (_: any, __: any, context: any) => {
    if (!context.user) {
      throw new Error("Unauthorized");
    }
    const userId = context.user.userId;
    const result = await todoServices.getTodo(userId);
    return result;
  }
 },
    Mutation: {

        //for user
       addUser: async (_: any, args: { email: string, password: string }) => {
            const hashed = await bcrypt.hash(args.password , 10);
            const result = userServices.addUser(args.email , hashed);
            return result;
        },

        editUser: async (_: any, args: {id: number, password: string}) => {
            const hashed = await bcrypt.hash(args.password, 10)
            const result = userServices.editUser(args.id , hashed);
            return result;
        
        },

        deleteUser: async (_: any, args: { id: number}) => {
            const result = await userServices.deleteUser(args.id);
            if(result == null) return "delete unsucessful";
            return "delete sucessful";
        },

        loginUser: async (_: any, args: { email: string; password: string }) => {
            const result = await userServices.findUserByEmail(args.email);

            if (!result || result.length === 0) {
                return "invalid username or password";
            }
            
            const storedHash = result[0].password;

            const finalCheck = await bcrypt.compare(args.password, storedHash!);
            
            if (finalCheck == null) {
                return "invalid username or password";
            }
            const token = generateToken({
                userId: result[0].id,
                email: args.email,
            });
            return token;
            },

            
        // for todo
        addTodo: async (_:any, args: {title: string, description: string}, context: any) => {
           
        if (!context.user) {
            throw new Error("Unauthorized");
        }
        const userId = context.user.userId;
        const result = await todoServices.addTodo(args.title, args.description, userId);

        if(result == null) return "unsucessful"
        return "sucessful"
        },

        editTodo: async (_: any, args: { id: number, title: string, description: string}, context: any) => {
            if (!context.user) {
            throw new Error("Unauthorized");
        }
        const userId = context.user.userId;
        const result = await todoServices.editTodo(args.id, args.title, args.description, userId);
             if(result == null) return "unsucessful"
        return "sucessful"
        },

        deleteTodo: async (_: any, args: { id: number}, context: any) => {
             if (!context.user) {
            throw new Error("Unauthorized");
        }
        const userId = context.user.userId;
        const result = await todoServices.deleteTodo(args.id);
        if(result == null) return "unsucessful"
        return "sucessful"
        }
        },

    

}
