import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";

function HomePage() {
  return (
    <main>
      <div className="">

      <HomeHeader />
      </div>
    
      <div className="mt-20">
        <SearchHome />
      </div>
      <div className="mt-5">
        <HomeCard />
      </div>
    </main>
  );
}

export default HomePage;
