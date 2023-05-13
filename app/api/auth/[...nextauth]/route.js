import { connectDB } from "@utils/database";
import NextAuth from "next-auth/next";
import Providers from "next-auth/providers";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id;
    return session;
  },

  async signIn({ profile }) {
    try {
      // serverless route
      // lamda function which means only when required it will it then only it will be executed.
      // it will then communicate with the database and then it will return the data.
      // connect to db
      await connectDB();
      // check if user exists
      // if yes return user
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").tolowercase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  },
});

export { handler as GET, handler as POST };
