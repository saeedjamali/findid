import Ads from "@/app/_components/ads/Ads";
import { authenticateUser } from "@/utils/authenticateMe";
import connectToDB from "@/utils/db";

import idDraftModel from "@/models/IDCard/Draft";
//?Action 1 : new -    2: new  with draft - 3: edit for user - 4: edit for admin 

export default async function Home() {
  const isAuthenticateUser = await authenticateUser();
  const { _id } = isAuthenticateUser;
  const { isConnected, message } = await connectToDB();
  const findFraft = await idDraftModel.findOne({ ownerIdCard: _id });

  return (
    <div>
      <Ads
        action={findFraft ? 2 :1}
        ad={JSON.parse(JSON.stringify(findFraft))}
      />
    </div>
  );
}
