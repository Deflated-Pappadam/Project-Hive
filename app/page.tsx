import Image from "next/image";
import Navbar from "./components/Navbar";
// MAIN LANDING PAGE
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-10  text-black items-center ">
      <Navbar />
      <section
        className="flex flex-col w-full h-full justify-center items-center"
        id="home"
      >
        <h1 className="poppins-regular md:text-[4rem] text-[2rem] md:max-w-[60vw] text-center py-10">
          <span className="protest-strike-regular text-[#2e2f33]">
            Wellness-focused
          </span>{" "}
          grooming, delivered to your doorstep
        </h1>
        <h2 className="text-2xl poppins-regular ">
          The first mobile dog grooming service developed by vets for happy,
          healthy pets
        </h2>
        <a href="/login" className="text-2xl poppins-semibold bg-[#2e2f33] text-white rounded-l-[40px] rounded-br-[40px] hover:rounded-tr-[40px]  px-6 py-4 m-5 transition-all"> 
        Join the club
        </a>
      </section>
      <section id="aboutUS">
        
      </section>
    </main>
  );
}
