'use client';

import { FaCheck } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { SiHono } from "react-icons/si";
import { SiUpstash } from "react-icons/si";
import { useRef } from "react";

import PureTextFormModal from "./_components/PureTextFormModal";


const Page = () => {

  const featuresOfTheApplication = [
    {
      id: 1,
      'feature': 'Optimized API'
    },
    {
      id: 2,
      'feature': 'Pretty Accurate'
    },
    {
      id: 3,
      'feature': '100% open source'
    }
  ];

  const modalOpenRef = useRef();

  return (
    <div className="min-h-screen flex flex-col items-center w-11/12 m-auto mt-20 gap-8">

      <p className="text-4xl lg:text-5xl font-bold tracking-wider text-indigo-200">
        PureText
      </p>

      <p className="leading-relaxed text-xl w-11/12 lg:w-3/4 text-center roboto-regular">
        <span className="text-indigo-300 text-2xl font-semibold">PureText</span> is designed to analyze and 
        detect inappropriate or harmful words in a sentence. Utilizing a powerful vector database 
        provided by Upstash, PureText delivers real-time evaluations of text submissions, flagging potentially 
        toxic or offensive content. With its user-friendly interface, developers can seamlessly integrate text 
        analysis into their applications, ensuring safer and more respectful communication across platforms.
      </p>

      <div className='mt-5 flex flex-col lg:flex-row gap-5'>

        {featuresOfTheApplication.map((feature) => (
          <div className="card bg-indigo-900 w-96 shadow-xl" key={feature.id}>

            <div className="card-body flex flex-col gap-5 items-center justify-center">

              <FaCheck size={30} />
              
              <p className="card-title text-center text-xl capitalize tracking-wide">{feature.feature}</p>

            </div>

          </div>
        ))}

      </div>

      <div className="mt-5">

        <button 
          className="btn bg-indigo-400 hover:bg-indigo-500 capitalize rounded-2xl shadow-2xl text-2xl tracking-wider flex items-center justify-center w-60 h-20 font-semibold"
          onClick={() => modalOpenRef.current.showModal()}
        >
          Try it Out
        </button>

      </div>

      <div className="mt-3 flex flex-col gap-4 items-center justify-center">

        <span className="text-lg text-indigo-300 tracking-wider">Powered By:</span>

        <div className="flex gap-4 items-center">

          <TbBrandNextjs size={30} />

          <SiHono size={30} className="text-orange-400" />

          <SiUpstash size={30} className="text-green-200" />

        </div>

      </div>

      <PureTextFormModal openModalRef={modalOpenRef} />

    </div>
  );
};

export default Page;
