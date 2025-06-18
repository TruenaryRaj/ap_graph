import { userServices } from "../services/userServices";
import bcrypt from 'bcrypt';
import { generateToken, generateVerificationCode } from "../auth/auth.services";
import { todoServices } from "../services/todoServices";
import { verficationCodeServices } from "../services/verficationCodeServices";

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

            const code =  generateVerificationCode(args.email);
            const approve = await verficationCodeServices.insertCode(args.email, code);
            if(approve == null) return "unsucessful";
            return code;
        },

        verifyCode: async (_: any, args: { email: string, code: string}, context: any) =>
        {
            const isValid = await verficationCodeServices.verifyCode(args.code);

            if (isValid[0].email != args.email) return("Invalid or expired verification code");

            const user = await userServices.findUserByEmail(args.email);
            if (!user) throw new Error("User not found");

            const token = generateToken({ userId: user[0].id, email: user[0].email! });
            verficationCodeServices.deleteCode(args.code);
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
