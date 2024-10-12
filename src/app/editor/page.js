import db from "@/lib/mongodb";
import EditorPage from './components/EditorPage';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function  Editor() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }
  
  const user = await db.collection("users").findOne({ "profile.email": session.user.email });


  const updateLinkList = async (linkList) => {
    'use server'
    if (!user) {
      throw new Error("User not found");
    }

    const result = await db.collection("users").updateOne(
      { "profile.email": user.profile.email }, 
      { $set: { linkList } } 
    );

    console.log("Update result:", result);
    revalidatePath(`/editor`);
  };

  const updateProfile = async (profile) => {
    'use server'
    if (!user) {
      throw new Error("User not found");
    }

    
    const result = await db.collection("users").updateOne(
      { "profile.email": user.profile.email },
      { $set: { profile } } 
    );

    console.log("Update result:", result);
    revalidatePath(`/editor`);
  };

  return (
    <EditorPage data={user} updateLinkList={updateLinkList} updateProfile={updateProfile} />
  );
}
