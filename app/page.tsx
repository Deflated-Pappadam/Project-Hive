"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Marquee from "react-fast-marquee";
import TagBox from "./components/TagBox";
import DataBox from "./components/DataBox";
import FaqBox from "./components/FaqBox";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import Modal from "./components/Modal";

// MAIN LANDING PAGE
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <main className="relative flex min-h-screen flex-col   text-[#2e2f33] items-center overflow-x-hidden ">
      <Navbar />
      <section
        className="flex flex-col w-full h-full justify-center items-center md:p-10 p-3"
        id="home"
      >
        <h1 className="poppins-regular md:text-[4rem] text-[2rem] md:max-w-[60vw] text-center py-10">
          <span className="protest-strike-regular text-[#2e2f33]">
            Re-volutionizing&nbsp;
          </span>
          the scope of Crowdfunders and Donation-drives{" "}
        </h1>
        <h2 className="text-2xl poppins-regular text-center ">
          Why does it always have to be a selfless donation ?
        </h2>
        <button
          onClick={toggleModal}
          className="text-2xl poppins-semibold bg-[#2e2f33] text-white rounded-tl-[40px] rounded-br-[40px]  hover:rounded-[40px]  px-6 py-4 m-5 transition-all"
        >
          Check it out!
        </button>
        <Modal isOpen={modalOpen} onClose={toggleModal} >
          <h1 className="text-3xl poppins-regukar text-center">Log in as</h1>
          <div className="flex justify-between items-center ">
            <a
              href="/innovators/login"
              className="text-2xl poppins-semibold bg-[#2e2f33] text-white rounded-tl-[40px] rounded-br-[40px] hover:rounded-tr-[40px] hover:rounded-bl-[40px]  px-6 py-4 m-5 transition-all"
            >
              Innovator
            </a>
            <a
              href="/investors/dash"
              className="text-2xl poppins-semibold bg-[#2e2f33] text-white rounded-tl-[40px] rounded-br-[40px] hover:rounded-tr-[40px] hover:rounded-bl-[40px]  px-6 py-4 m-5 transition-all"
            >
              Contributor
            </a>
          </div>
        </Modal>
        <img src="hero (1).png" className="w-full " />
      </section>
      <section id="aboutUS">
        <Marquee speed={160} className="flex ">
          <h1 className="text-[8rem] poppins-regular w-fit overflow-hidden">
            Struggling to bring your ideas to life? We&apos;ve got you
            covered!&nbsp;
          </h1>
        </Marquee>
        <div className="flex md:flex-wrap md:flex-row flex-col  md:justify-center md:gap-4 md:w-[60vw] md:mx-auto  space-y-2 items-center">
          <TagBox text="Multi-Pillar System" color="#f3d6b3" />
          <TagBox text="Core Verification" color="#f3e6b3" />
          <TagBox text="Enhanced Exposure" color="#eacbac" />
          <TagBox text="Requirement based" color="#f3e6b3" />
          <TagBox text="Simplified User Experience" color="#f3e6b3" />
          <TagBox text="Blockchain integrated" color="#f3e6b3" />
          <TagBox text="Mutually-beneficial ecosystem" color="#eacbac" />
          <TagBox text="Idea Driven" color="#f3e6b3" />
        </div>
      </section>

      <section className="flex flex-col bg-[#f3e6bc] w-full h-full justify-center items-center md:p-10 my-10 rounded-[3rem]">
        <h1 className="text-[4rem] poppins-medium">Scenarios</h1>
        <h2 className="text-[2rem] poppins-light text-center">
          Requests are managed in accordance with specified requirements and
          preset conditions. <b>Project Hive</b> primarily encompasses the following factors
          that determine the state, essence, and fate of an initiative.
        </h2>
        <div className="flex flex-wrap p-2 justify-center items-center">
          <DataBox
            img="plane.png"
            text="Assuring exposure for deserving initiatives and ideas."
          ></DataBox>
          <DataBox
            img="money.png"
            text=" Monetary aid via crowd-funding, campaigns and donations."
          ></DataBox>
          <DataBox
            img="aid.png"
            text=" 
          Technical aid through mentorship, labor, and advice."
          ></DataBox>
        </div>
      </section>

      <section id="whitebox">
        <div className="md:w-[80vw] mx-auto bg-white h-full rounded-[2rem] p-[4vw] shadow-md">
          <h1 className="md:text-[4rem] text-[3rem] text-[#232f33] px-[3vw] poppins-regular text-center pb-5">
            The three pillars of
            <span className="poppins-semibold"><b> Project Hive</b></span>{" "}
          </h1>
          <div className="flex justify-center items-center  ">
            <div className="min-w-[30vw] flex justify-center items-center p-[4vw]">
              <Image
                src="/bee.png"
                className="md:w-[500px] w-[30px] rounded-full "
                alt=""
                width={1080}
                height={1080}
              />
            </div>
            <div className="w-[70vw] flex justify-start items-center">
              <div className="flex flex-col poppins-medium text-xl  tracking-tighter leading-none">
                <h2 className="flex items-center text-2xl text-black m-4">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#8dffbade] rounded-full p-2 mx-5">
                    <FaCheck className="w-[20px] -rotate-[15deg]" />
                  </div>
                  <b>Innovators </b>- The Idea people
                </h2>
                <h2 className="flex items-center text-2xl text-black m-3">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#8dffbade] rounded-full p-2 mx-5">
                    <FaCheck className="w-[20px] -rotate-[15deg]" />
                  </div>
                  <b>Supporters </b>- The Tech & labour people
                </h2>
                <h2 className="flex items-center text-2xl text-black m-3">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#8dffbade] rounded-full p-2 mx-5">
                    <FaCheck className="w-[20px] -rotate-[15deg]" />
                  </div>
                  <b>Contributers </b>- The benefactors
                </h2>
             
                <div className="flex items-center justify-center p-10">
                  <a href="https://project-bit-bites.vercel.app/"
                    className="text-2xl poppins-semibold bg-[#2e2f33] text-white rounded-tl-[40px] rounded-br-[40px] hover:rounded-[40px]  px-6 py-4 m-5 transition-all" //hover:rounded-tr-[40px] hover:rounded-bl-[40px]
                  >
                    BIT BITES
                  </a>
                  <h2>Check out our latest donation campaign.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <section id="blackBox" className="p-5">
        <div className="f md:w-[80vw] bg-[#2e2f33]  rounded-[3rem] h-full py-[2vw] md:px-[4vw] justify-center items-center ">
          <h1 className="md:text-[4rem] text-[3rem] text-[#f3e6bc] px-[3vw] poppins-regular text-center pb-5">
            Acquiring Capital
          </h1>
          <div className="flex flex-col md:flex-row">
            <div className="flex min-h-full">
              <Image
                alt=""
                width={1080}
                height={1080}
                src="/investor.png"
                className="rounded-[3rem] min-w-[400px] h-[400px] md:m-0 m-3 "
              />
            </div>
            <div className=" flex flex-col justify-start items-start">
              <div className="flex md:flex-row flex-col  w-fit px-[5vw] p-5 justify-center items-center">
                <Image
                  src="/test.png"
                  className="md:w-[100px] w-[70px] md:m-0 m-5"
                  alt=""
                  width={1080}
                  height={1080}
                />
                <div className="px-10">
                  <h2 className="text-[#fcf9f5] md:text-[2rem] text-[1.5rem]">
                    Via Donations{" "}
                  </h2>
                  <h3 className="text-[#fcf9f5] text-[1rem] poppins-light">
                    A blockchain-powered donation platform ,aimed at charitable causes, which reshapes the
                    existing landscape, allowing contributors to earn money
                    through NFT sales. Donors are presented with NFTs as a token
                    of appreciation, which they can choose to retain as a
                    collectible or re-sell. Further income is generated through
                    creator charges upon the resale of NFTs.
                  </h3>
                </div>
              </div>
              <div className="flex md:flex-row flex-col w-fit px-[5vw] p-5 justify-center items-center">
                <Image
                  src="/test.png"
                  className="md:w-[100px] w-[70px] md:m-0 m-5"
                  alt=""
                  width={1080}
                  height={1080}
                />
                <div className="px-10">
                  <h2 className="text-[#fcf9f5] md:text-[2rem] text-[1.5rem]">
                    Via Crowdfunding{" "}
                  </h2>
                  <h3 className="text-[#fcf9f5] text-[1rem] poppins-light">
                    In crowdfunding, individuals can showcase ideas to
                    benefactors who can support through financial contributions
                    or guidance. Benefactors are rewarded with PDM credits
                    proportional to their donations, redeemable for services
                    from our marketplace, fostering a mutually beneficial
                    ecosystem. This innovative approach not only supports
                    projects but also creates a dynamic community of
                    collaboration and shared success.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className=" h-full flex flex-col justify-center md:w-[80vw] mx-auto"
        id="faq"
      >
        <h1 className="text-[4rem] protest-strike-regular py-5">FAQ</h1>
        <div className="space-y-4">
          <FaqBox
            question="Q.  As a benefactor, what would motivate me to choose this fundraising platform over existing ones that promise top-tier ideas?"
            answer="As a benefactor, choosing this fundraising platform is particularly appealing because it offers a unique incentive **PDM credits**. These credits, proportionate to your contributions, can be utilized to access services within our marketplace. This distinctive feature sets our platform apart from others, providing an exclusive benefit that enhances the overall value of your support."
          />
          <FaqBox
            question="Q. As an innovator, what would motivate me to choose this platform, especially if there is no assurance that I'll secure what I desire?"
            answer="Choosing this platform as an innovator ensures diverse opportunities and investor engagement. While guarantees aren't explicit, the dynamic environment increases the chance of finding support aligned with your goals. Compelling ideas and presentations won't go unnoticed, showcasing the platform's commitment to recognizing exceptional innovations, despite the absence of absolute assurances."
          />
          <FaqBox
            question="Q. As an contributor, what guarantees or assurances do I receive when considering the donations made on this platform?"
            answer="
Investing in initiatives featured on this platform may or may not present the potential for diverse opportunities and innovation. We encourage contributors to carefully consider their partnerships and think twice before committing to a cause. Our objective is to facilitate connections between benefactors and innovative ventures, creating an environment conducive to successful collaborations grounded in the merit and potential of each initiative."
          />
          <FaqBox question="Q.Why should I as an innovator agree to exchange my products for PDM credits?" answer=" As an innovator, we propose a hassle-free process without upfront requirements. In a gesture of goodwill and trust, we suggest accepting PDM credits for your products until your debt is cleared, amounting to just 2% of the total initial requirement. This ensures a fair and straightforward exchange, fostering a collaborative and supportive partnership."/>
        </div>
      </section>

      <footer className="flex flex-col justify-center items-center min-h-[40vh] w-full  bg-[#2e2f33]  mt-[10rem] p-[5vw]">
        <h1 className="text-[4rem] text-white">Project Hive</h1>
        <h2 className="text-[2rem] text-white">Re-volutionizing the scope of Crowdfunders and Donation-drives</h2>
        <h3 className="text-[1rem] text-white p-4"> ©️ deflatted pappadam 2024</h3>
      </footer>
    </main>
  );
}
