import z, { email } from "zod";

const userRegistrationRequestSchema = z.object(
    //     {
    //         email : z.email().catch("Invalid email address"),
    //         firstName : z.string().min(3).max(25).catch("Invalid first name"),
    //         lastName : z.string().min(3).max(25).catch("Invalid first name"),
    //         password : z.string().min(8).max(25).catch("Invalid Password")
    //    }
    {
        email: z.email(
            {
                error: "Invalid email address"
            }
        ),
        firstName : z.string(
            {
                error : "Invalid first name"
            }
        ).min(3, "First name must be at least 3 character long").max(25, "First name must be at most 25 character long"),
        lastName : z.string(
            {
                error : "Invalid last name"
            }
        ).min(3, "Last name must be at least 3 character long").max(25, "First name must be at most 25 character long"),
        password : z.string({error:"Invalid Password"}).min(8, "Password must be at least 8 characters long").max(25, "Password must be at most 25 characters long")
    }
)

export default userRegistrationRequestSchema