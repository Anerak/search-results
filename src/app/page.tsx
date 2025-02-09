import SearchResults from "@/app/ui/results/SearchResults";
import Sidebar from "@/app/ui/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <Sidebar />
      <SearchResults />
    </div>
  );
}
