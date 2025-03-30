import prisma from "../../../DB/db.config.js";


export default async function OauthDataChecking(data) {

    const { userId: userid, provider, profileImage, firstName, lastName, email, verify} = data;
    if (!userid || !provider || !profileImage || !firstName || !email || !verify ) {
        return { success: false, message: "🤬🤬🤬🤬" };
    }

    try {
        const oauthUser = await prisma.$queryRaw`
            WITH check_user AS (
            SELECT "userId"
            FROM "User"
            WHERE "email" = ${email}
            ),
            insert_user AS (
                INSERT INTO "User" ("userId", "provider", "profileImage", "firstName", "lastName", "email", "verify")
                SELECT ${userid}, ${provider}, ${profileImage}, ${firstName}, ${lastName}, ${email}, ${verify}
                WHERE NOT EXISTS (SELECT 1 FROM check_user)
                RETURNING "userId"
            )
            SELECT "userId" 
            FROM check_user
            UNION ALL
            SELECT "userId"
            FROM insert_user
        `;

        console.log( " server Oauth check ", oauthUser)


        if (oauthUser.length === 0 || oauthUser[0].userId === null) {
            return { success: false, message: "Internal Server Error" };
        } else {
            return {
                success: true,
                message: "Oauth User Created Successfully",
                userId: oauthUser[0].userId,
              }
        }
    } catch (error) {
        console.error("Error checking web service OauthDataChecking Prisma - issue:", error);
        return { success: false, message: "Internal Server Error" };
    }
}
