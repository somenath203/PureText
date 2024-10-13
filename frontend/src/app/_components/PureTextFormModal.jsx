'use client';

import { useRef, useState } from "react";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from "axios";

import ResultAnalysisModal from "./ResultAnalysisModal";


const PureTextFormModal = ({ openModalRef }) => {

  const notyf = new Notyf({
    duration: 4000,
    ripple: true,
    position: {
      x: 'right',
      y: 'top'
    }
  });

  const [ inputText, setInputText ] = useState();

  const [ loading, setLoading ] = useState();

  const [ result, setResult ] = useState();


  const openResultModal = useRef();


  const onSubmitForm = async () => {

    try {

      setLoading(true);

      if (inputText.split(' ').length >= 150) {

        notyf.error('the number of words should be greater than 150');

      } else {

        const { data } = await axios.post(process.env.NEXT_PUBLIC_HONO_BACKEND_URL, {
          inputMessageByUserFromFrontend: inputText
        });

        setResult(data);

        if(data) {

          openModalRef.current.close();

          openResultModal.current.showModal();

        }

      }
      
      
    } catch (error) {
      
      console.log(error);

      notyf.error(error || 'Something went wrong from the server side. Please try again after sometime.');
      
    } finally {

      setLoading(false);

    }

  }


  const closeModal = () => {

    openModalRef.current.close();
    
  }

  
  return (
    <>
      <dialog id="my_modal_1" className="modal" ref={openModalRef}>

        <div className="modal-box flex flex-col gap-5">

          <h3 className="font-bold text-xl text-center">Check Sentence</h3>

          <form method="dialog" className="flex flex-col" onSubmit={onSubmitForm}>

            <input
              type="text"
              placeholder="enter your text here (max 150 words)"
              className="input border-white"
              onChange={(e) => setInputText(e.target.value)}
              required
            />

            <div className="flex gap-4 justify-end mt-5">

              <button disabled={loading} type="button" className="btn btn-neutral" onClick={closeModal}>Cancel</button>

              <button disabled={loading} type="submit" className="btn disabled:bg-indigo-600 bg-indigo-400 hover:bg-indigo-500">
                {loading ? <span className="loading loading-dots loading-lg"></span> : 'Submit'}
              </button>

            </div>

          </form>

        </div>

      </dialog>

      <ResultAnalysisModal openResultModalRef={openResultModal} inputTextOfUser={inputText} analysisData={result} />

    </>
  );
};

export default PureTextFormModal;
