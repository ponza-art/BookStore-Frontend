import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";


function HomePage() {
  return (
    <main >
      <HomeHeader />
      <SearchHome />

      <HomeCard />
    </main>
  );

}

export default HomePage;
