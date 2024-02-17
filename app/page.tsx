import Image from "next/image";
import Navbar from "./components/Navbar";
import Marquee from "react-fast-marquee";
import TagBox from "./components/TagBox";
import DataBox from "./components/DataBox";
// MAIN LANDING PAGE
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-10  text-[#2e2f33] items-center ">
      <Navbar />
      <section
        className="flex flex-col w-full h-full justify-center items-center min-h-screen"
        id="home"
      >
        <h1 className="poppins-regular md:text-[4rem] text-[2rem] md:max-w-[60vw] text-center py-10">
          <span className="protest-strike-regular text-[#2e2f33]">
            Re-volutionizing
          </span>
           the framework of collaborative initiatives  </h1>
        <h2 className="text-2xl poppins-regular text-center ">
        Bridging the gap between innovators, supporters and investors.
        </h2>
        <a
          href="/login"
          className="text-2xl poppins-semibold bg-[#2e2f33] text-white rounded-l-[40px] rounded-br-[40px] hover:rounded-tr-[40px]  px-6 py-4 m-5 transition-all"
        >
          Join Us!
        </a>
      </section>
      <section id="aboutUS">
        <Marquee speed={160}>
          <h1 className="text-[8rem] poppins-regular">
Struggling to bring your ideas to life? We&apos;ve got you covered!
          </h1>
        </Marquee>
        <div className="flex flex-wrap w-[60%] mx-auto gap-6 justify-center items-center">
          <TagBox text="Multi-Tier System" color="#f3d6b3" />
          <TagBox text="Core Verification" color="#f3e6b3" />
          <TagBox text="Public-Equity" color="#eacbac" />
          <TagBox text="Requirement based" color="#f3e6b3" />
          <TagBox text="" color="#f3e6b3" />
          <TagBox text="Test Tag" color="#f3e6b3" />
          <TagBox text="Test Tagdfgsdf" color="#eacbac" />
          <TagBox text="Test Tag" color="#f3e6b3" />
        </div>
      </section>

     
      <section className="flex flex-col bg-[#f3e6bc] w-full h-full justify-center items-center p-10 my-10 rounded-[3rem]">
      <h1 className="text-[4rem] poppins-regular">
           some heading
      </h1>
      <h2 className="text-[2rem] poppins-light text-center">
           lorem ipsum askf ajhf  avfjhg asjfg agfiugwkesa asfgui lorem ipsum askf ajhf  avfjhg asjfg agfiugwkesa asfgui
      </h2>
       <div className="flex flex-wrap p-2 ">
       <DataBox
          img="https://assets-global.website-files.com/656e2bf7323334f83eee35f6/658055ed923b19afb55334ca_reportcard.png"
          text=" Stay informed with digital health reports and records"
        ></DataBox>
        <DataBox
          img="https://assets-global.website-files.com/656e2bf7323334f83eee35f6/658055ed923b19afb55334ca_reportcard.png"
          text=" Stay informed with digital health reports and records"
        ></DataBox>
        <DataBox
          img="https://assets-global.website-files.com/656e2bf7323334f83eee35f6/658055ed923b19afb55334ca_reportcard.png"
          text=" Stay informed with digital health reports and records"
        ></DataBox>
       </div>
      </section>
      <section className=" w-full h-full flex flex-col justify-center " id="faq">
      <h1 className="text-[4rem] protest-strike-regular">
           FAQ
      </h1>
      
      </section>
    </main>
  );
}
