import db from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email", // Request profile information (includes first and last name)
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
   
    async signIn({ user }) {
      const nameParts = user.name.split(' ');
      const firstName = nameParts.slice(0, -1).join(' '); // All parts except the last as first name
      const lastName = nameParts[nameParts.length - 1];
      
      const exist = await db.collection("users").findOne({ "profile.email": user.email });
      console.log("exist: "+exist)
      if(!exist)
      {
        await db.collection("users").insertOne({linkList:[],profile:{proPic:user.image, firstName:firstName, lastName:lastName,email:user.email}})
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to editor page if login is successful
      return "/editor";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
