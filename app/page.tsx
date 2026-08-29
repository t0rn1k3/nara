import { HomeClient } from "@/components/home-client";
import { getNarratives } from "@/sanity/narratives";

export default async function Home() {
  const narratives = await getNarratives();

  return <HomeClient narratives={narratives} />;
}
