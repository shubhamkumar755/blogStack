import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite";

// codes are written while seeing appwrite documentation...

export class AuthService {
    client= new Client()
    account
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name) // "ID.unique()" in appwrite generates unique id like nanoid
            if(userAccount){
                // call another method
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        }       
        catch(error){
            throw error
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password) //this will create a session over the app means the user will be logged in
        }
        catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error ",error)
        }
        return null
    }

    async logout(){ //delete session is actually logout
        try{
            await this.account.deleteSessions()
        }
        catch(error){
            console.log("Appwrite service :: logout :: error ", error)
        }
    }
}

const authService=new AuthService()

export default authService