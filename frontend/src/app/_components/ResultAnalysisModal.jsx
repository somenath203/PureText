'use client';

import { useEffect, useState } from "react";


const ResultAnalysisModal = ({ openResultModalRef, inputTextOfUser, analysisData }) => {

  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const formatScore = (score) => {

    return (score * 100).toFixed(2) + '%';

  };


  const closeModal = () => {

    openResultModalRef?.current?.close();

  }
  

  return (
    isMounted && <dialog id="my_modal_1" className="modal" ref={openResultModalRef}>

      <div className="modal-box">

        <h3 className="font-bold text-xl text-center">Result Analysis</h3>

        <div className="w-full max-w-md bg-indigo-950 text-white text-xl text-center p-4 rounded-lg shadow-md my-4 flex flex-col gap-2">

          <p>Input Text:</p>

          <p className="font-bold">{inputTextOfUser}</p>

        </div>

        {analysisData && analysisData?.isProfanity === true ? (
            
          <div className="text-lg flex flex-col items-center justify-center gap-4 text-center mt-6 text-gray-200">

            <p className="text-4xl">🤬🤬</p>
              
            <div className="flex flex-col gap-4 p-6 bg-indigo-900 rounded-xl shadow-xl">

              <p className="text-gray-100">According to the analysis, the text provided by you contains offensive or vulgar language.</p>

              <p className="flex items-center justify-center gap-2 text-center">

                <span>Score(higher score is worse):</span>

                <span className="font-bold text-indigo-200">{formatScore(analysisData?.score)}</span>

              </p>

            </div>
            
          </div>

        ) :  <div className="text-lg flex flex-col items-center justify-center gap-4 text-center mt-6 text-gray-200">

            <p className="text-4xl">✅</p>
              
            <div className="flex flex-col gap-4 p-6 bg-indigo-900 rounded-xl shadow-xl">

              <div className="text-gray-100">According to the analysis, the text provided by you contains no offensive or vulgar language.</div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-2 text-center">

                <span>Score(higher score is worse):</span>

                <span className="font-bold text-indigo-200">{formatScore(analysisData?.score)}</span>

              </div>

            </div>

          </div>}


        <div className="modal-action">

          <form method="dialog">

            <button className="btn" onClick={closeModal}>Close</button>

          </form>

        </div>

      </div>

    </dialog>
  );
};

export default ResultAnalysisModal;
