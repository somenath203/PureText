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
            
<<<<<<< HEAD
          <div className="text-lg flex flex-col items-center justify-center gap-4 text-center mt-6 text-gray-200">

            <p className="text-4xl">🤬🤬</p>
              
            <div className="flex flex-col gap-4 p-6 bg-indigo-900 rounded-xl shadow-xl">

              <p className="text-gray-100">According to the analysis, the text provided by you contains offensive or vulgar language.</p>

              <p className="flex items-center justify-center gap-2 text-center">

                <span>Score(higher score is worse):</span>

                <span className="font-bold text-indigo-200">{formatScore(analysisData?.score)}</span>

              </p>

            </div>
=======
            <p className="text-lg flex flex-col gap-2 text-gray-200">
              
              <span className="font-medium">According to the analysis, the sentence you provided contains offensive or vulgar language.</span>
              
              <span className="text-gray-100">We detected the following possible offensive texts in the sentence you provided:</span>
>>>>>>> c29b3d50da01c1a48246a9ffb29c52ff6af6b0fc
            
          </div>

<<<<<<< HEAD
        ) :  <div className="text-lg flex flex-col items-center justify-center gap-4 text-center mt-6 text-gray-200">

            <p className="text-4xl">✅</p>
=======
            {analysisData?.flaggedWords?.map((wordAndScore, index) => (
              
              <div key={index} className="w-full max-w-md bg-indigo-900 p-4 rounded-lg shadow-md my-2">
                
                <div className="text-lg flex flex-col gap-2 text-left">
                  
                  <p className="text-white-200">
                    
                    <span className="font-semibold text-gray-200">Detected Text: </span>
                    
                    <span className="text-indigo-200 font-bold">{wordAndScore?.text}</span>
                  
                  </p>

                  <p className="text-gray-200">
                    
                    <span className="font-semibold text-gray-200">Similarity Score: </span>
                    
                    <span className="text-indigo-200 font-bold">{formatScore(wordAndScore?.score)}</span>
                  
                  </p>
                
                </div>
>>>>>>> c29b3d50da01c1a48246a9ffb29c52ff6af6b0fc
              
            <div className="flex flex-col gap-4 p-6 bg-indigo-900 rounded-xl shadow-xl">

<<<<<<< HEAD
              <p className="text-gray-100">According to the analysis, the text provided by you contains no offensive or vulgar language.</p>
=======
            <p className="italic text-gray-200 my-4 text-lg">
              Note: The text listed, along with their scores, may not be exact matches from the original sentence but are closely similar to offensive terms found in your text.
            </p>
>>>>>>> c29b3d50da01c1a48246a9ffb29c52ff6af6b0fc

              <p className="flex items-center justify-center gap-2 text-center">

                <span>Score(higher score is worse):</span>

                <span className="font-bold text-indigo-200">{formatScore(analysisData?.score)}</span>

              </p>

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
