import HomeCard from "./HomeCard";
import SearchHome from "./SearchHome";
import HomeHeader from "../components/HomeHeader";


function HomePage() {
  return (
    <main >
      <HomeHeader />
      <div className="mt-9">

      <SearchHome  />
      </div>

<div className="mt-5">

      <HomeCard />
</div>
    </main>
  );

}

export default HomePage;
