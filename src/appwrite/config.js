import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
    client = new Client()
    databases
    bucket
    account

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    //slug is just "-" separated title which is unique
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }


    async updatePost(slug, { title, content, featuredImage, status }) { //slug is acting as the unique ID for the document. The rest(title, content, etc.) is the data you're updating.
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) { //using query as we want only active posts
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    // // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        }
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    //writing directly without async as it returns very fast so no need to wait
    getFilePreview(fileId) {
    try {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite service :: getFilePreview :: error", error)
        return false;
    }
}

}

const service = new Service()
export default service