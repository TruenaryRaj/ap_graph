import { userServices } from "../services/userServices";

export const resolvers = {
  Query: {
    getUser: () => {
        const result = userServices.getUser();
        return result;
    },
 },
    Mutation: {
       addUser: async (_: any, args: { email: string, password: string }) => {
            const result = userServices.addUser(args.email , args.password);
            return result;
        },

        editUser: async (_: any, args: {id: number, password: string}) => {
            const result = userServices.editUser(args.id , args.password);
            return result;
        
        },

        deleteUser: async (_: any, args: { id: number}) => {
            const result = await userServices.deleteUser(args.id);
            if(result == null) return "delete unsucessful";
            return "delete sucessful";
        },
 
},

}
