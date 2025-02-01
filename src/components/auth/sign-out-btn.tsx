"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation'

export const SignOutButton = () => {
    const router = useRouter();
    
    return (

            <button onClick={async () => {
                await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push('/signin')
                      },
                    },
                  });
            }}>sign out</button>

    )
}
