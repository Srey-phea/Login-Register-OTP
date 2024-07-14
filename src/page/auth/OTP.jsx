import { useEffect, useRef, useState } from "react";

export default function OTP() {
  const emptyOTP = ['', '', '', '', '', ''];
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyOTP);
  const [missing, setMissing] = useState(emptyOTP);
  const [code, setCode] = useState('');

  // Fetch the CODE from the API
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch('http://136.228.158.126:50003/api/code');
        const data = await response.json();
        setCode(data.code);
      } catch (error) {
        console.error('Error fetching the code:', error);
      }
    };

    fetchCode();
    refs[0].current.focus();
  }, []);

  const handleSubmit = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === '') return i;
      })
      .filter((item) => item || item === 0);
    console.log('missed ', missed);
    setMissing(missed);
    if (missed.length) {
      return;
    }
    const userInput = inputs.join('');
    const isMatch = userInput === code;
    const msg = isMatch ? 'Code is Valid' : 'Code is not Valid';
    alert(msg);
  };

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    console.log(val, index);
    if (!Number(val)) return;
    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }

    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  };

  const handleOnKeyDown = (e, index) => {
    console.log(e.keyCode, index);
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = '';
      setInputs(copyInputs);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  console.log("inputs ", inputs);
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="text-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4 sm:p-6 bg-zinc-200 rounded-md focus:outline-none">
        <h2 className="mt-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[Poppins] font-semibold">OTP Authentication</h2>
        <p className="mt-4 text-md sm:text-sm md:text-md lg:text-lg font-[Koh Santepheap] text-slate-600">
          បញ្ចូលលេខកូដ ៦ ខ្ទង់ដែលបានផ្ញើរទៅកាន់អុីម៉ែលរបស់អ្នក
        </p>
        <div className="mt-4 flex justify-center space-x-1 sm:space-x-2">
          {emptyOTP.map((item, i) => (
            <input
              value={inputs[i]}
              key={i}
              ref={refs[i]}
              type="text"
              maxLength="1"
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleOnKeyDown(e, i)}
              className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 m-1 font-bold text-center rounded-md border-2 ${
                missing.includes(i) ? 'border-red-500' : 'border-gray-300'
              } focus:border-blue-500 focus:outline-none`}
            />
            
          ))}
        </div>
        <button onClick={handleSubmit}
        className="mt-6 h-10 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] lg:min-h-[64px] xl:min-h-[72px] w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 xl:w-5/6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-[Koh Santepheap] bg-[#222162] text-white rounded focus:outline-none">
        បញ្ជាក់
   </button>
    <h1 className="mt-6 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl font-[Koh Santepheap] font-bold">
          មិនទទួលបាន OTP ?​ <span className="underline text-[#222162]">ផ្ញើរម្តងទៀត</span>
        </h1>
      </div>
    </div>
  );
}
