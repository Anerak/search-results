import Sidebar from "./sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <h1>Bye</h1>
      </main>
    </div>
  );
}
