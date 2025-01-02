"use client";

import Ads from "@/app/_components/ads/Ads";


//?Action 1 : new -    2: new  with draft - 3: edit for user - 4: edit for admin

export default function Home() {
  
  return (
    <div>
    
      <Ads action={1} ads={null} />
    </div>
  );
}
