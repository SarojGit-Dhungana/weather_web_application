import Footer from "@/component/Footer";
import Header from "@/component/Header";
import HomeContent from "@/component/Home/HomeContent";
function HomePage() {
  return (
    <div className="flex flex-col md:flex-row px-2 md:items-center min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-purple-950 text-white">
      <Header />
      <div className="flex flex-col flex-1 relative z-10">
        <main className="flex-1 flex justify-center md:justify-start items-start px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="w-full max-w-6xl">
            <HomeContent />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default HomePage;
