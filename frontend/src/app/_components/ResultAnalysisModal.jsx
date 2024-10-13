'use client';

const ResultAnalysisModal = ({ openResultModalRef, analysisData }) => {


  const formatScore = (score) => {

    return (score * 100).toFixed(2) + '%';

  };


  const closeModal = () => {

    openResultModalRef.current.close();

  }
  

  return (
    <dialog id="my_modal_1" className="modal" ref={openResultModalRef}>

      <div className="modal-box">

        <h3 className="font-bold text-xl text-center">Result Analysis</h3>

        {analysisData && analysisData?.isProfanity === true ? (
          <div className="flex flex-col gap-6 items-center justify-center text-center mt-6 p-4 rounded-lg shadow-lg">
            
            <p className="text-lg flex flex-col gap-2 text-gray-200">
              
              <span className="font-medium">According to the analysis, the text you provided contains offensive or vulgar language.</span>
              
              <span className="text-gray-100">We detected the following offensive words in the sentence you provided:</span>
            
            </p>

            {analysisData?.flaggedWords?.map((wordAndScore, index) => (
              
              <div key={index} className="w-full max-w-md bg-indigo-900 p-4 rounded-lg shadow-md my-2">
                
                <div className="text-lg flex flex-col gap-2 text-left">
                  
                  <p className="text-white-200">
                    
                    <span className="font-semibold text-gray-200">Detected Word: </span>
                    
                    <span className="text-indigo-200 font-bold">{wordAndScore?.text}</span>
                  
                  </p>

                  <p className="text-gray-200">
                    
                    <span className="font-semibold text-gray-200">Similarity Score: </span>
                    
                    <span className="text-indigo-200 font-bold">{formatScore(wordAndScore?.score)}</span>
                  
                  </p>
                
                </div>
              
              </div>
            ))}

            <p className="italic text-gray-200 my-4 text-lg">
              Note: The words listed, along with their scores, may not be exact matches from the original sentence but are closely similar to offensive terms found in your text.
            </p>

          </div>
        ) : <>

          <p className="text-center text-gray-100 text-lg my-4">According to the analysis, the text provided by you contains no offensive or vulgar language.</p>
        
        </>}


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
