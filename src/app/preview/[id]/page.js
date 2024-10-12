

import db from "@/lib/mongodb";
import PreviewComponent from "./components/PreviewComponent";
import { ObjectId } from "mongodb";


export default async function Preview({params}) {
  const user = await db.collection("users").findOne({_id: new ObjectId(params.id)});

  return (
    <div>
      <PreviewComponent data={user} />
    </div>
  );
}
