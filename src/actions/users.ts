"use server"

import { createClient } from "@/app/auth/server"
import { handleError } from "@/lib/utils"
import { prisma } from "@/db/prisma"

export const loginAction = async (email: string, password: string) => {
    try {
        const {auth} = await createClient();
        const {data, error} = await auth.signInWithPassword({
            email,
            password,
        });

        if(error) throw error;

        return {
            errorMessage: null,
        }
    } catch(error) {
        return handleError(error);
    }
}

// export const logOutAction = async () => {
//     try {
//         const {auth} = await createClient();
//         const error = await auth.signOut();

//         if(error) throw error;

//         return {
//             errorMessage: null,
//         }
//     } catch(error) {
//         return handleError(error);
//     }
// }

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();
    
    // Check if session exists first
    const { data: session } = await auth.getSession();
    if (!session?.session) {
      // Already logged out
      return { errorMessage: null };
    }
    
    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export const signUpAction = async (email: string, password: string) => {
    try {
        const {auth} = await createClient();
        const {data, error} = await auth.signUp({
            email,
            password,
        });

        if(error) throw error;

        const userId = data.user?.id;

        if(!userId) throw new Error("Error signing up");

        await prisma.user.create({
            data: {
                id: userId,
                email,
            },
        });

        return {
            errorMessage: null,
        }
    } catch(error) {
        return handleError(error);
    }
}

export const getCurrentUserAction = async () => {
    try {
        const {auth} = await createClient();
        const userObject = await auth.getUser();

        if(userObject.error) {
            console.error(userObject.error);
            return null;
        }

        return userObject.data.user;
    } catch(error) {
        return handleError(error);
    }
}
