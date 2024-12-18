import { getIds } from "@/actions/getIds";
import AppProvider from "../context/AppProvider";
import { Id_PER_PAGE } from "@/config/constants";




export default async function RootLayout({ children }) {
  const initialIds = await getIds(0, Id_PER_PAGE);
  return (
   
      <>
        
          <AppProvider>{children}</AppProvider>
        
      </>
   
  );
}
