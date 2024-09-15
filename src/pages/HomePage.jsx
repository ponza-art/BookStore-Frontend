import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";

function HomePage() {
  return (
    <main className="container mx-auto">

      <HomeHeader />
    <div className="mt-10">
        <SearchHome />

    </div>
      <div className="mt-5 ">
        <HomeCard />
      </div>
    </main>
  );
}

export default HomePage;
