import z, { email } from "zod";

const userAuthenticationRequestSchema = z.object(

    {
        email: z.email({ error: "Invalid email" }),
        password: z.string({ error: "Invalid password" }).min(8, { error: "Password must be at least 8 charachters long" }).max(25, { error: "Password must be at most 25 characters long" })
    }
)

export default userAuthenticationRequestSchema