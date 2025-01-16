// "use client";
import { getIds } from "@/actions/getIds";
import { Id_PER_PAGE } from "@/config/constants";
// import IdList from "../_components/List/IdList(workwithbuttonLoadMore)";
import IdListInfinite from "./_components/List/IdListInfinite";
import Nav from "./_components/nav/Nav";
import { Toaster } from "react-hot-toast";
import { authenticateUser } from "@/utils/authenticateMe";
import bookmarkModel from "@/models/IDCard/Bookmarks";


export default async function Home() {
  const initialIds = await getIds(0, Id_PER_PAGE);
  const authUser = await authenticateUser();
  let bookmarksId = [];
  if (authUser) {
    bookmarksId = await bookmarkModel.find({ user: authUser._id });
  }
  // console.log("bookmarksId--->", bookmarksId);
  return (
    <div>
     
      <Toaster />
      {/* <IdListInfinite initialIds={initialIds} /> */}
      <Nav />
      <div className=" container p-5 mx-auto mt-4  rounded-lg ">
        <IdListInfinite
          initialIds={initialIds}
          bookmarksId={JSON.parse(JSON.stringify(bookmarksId))}
        />
      </div>
    </div>
  );
}
