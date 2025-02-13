import { useEffect, useRef, useState } from "react";
// import { prompt, text } from "./Gemoni";
import "./App.css";

import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const ref = useRef();
  const p = useRef();
  const [message, setMessage] = useState("");
  // const [text, setText] = useState("");
  const [stext, setStext] = useState("");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // const prompt = "About bangladesh";
  const prompt = stext;

  const foo = async () => {
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    let message = result.response.text();
    message = message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    message = message.replace(/^\s*\*/gm, "<br/>");
    message = message.replace(/\n/g, "<br/>");
    console.log(message);
    setMessage(message);
  };

  // useEffect(() => {
  //   foo();
  // }, [text]);

  const onsubmit = () => {
    // setText(stext);
    console.log(stext);
    foo();
    // ref.current.value = "";
  };
  return (
    <>
      <div>
        <h1>Gemini AI Chatbot</h1>
        <input
          ref={ref}
          onChange={(e) => {
            setStext(e.target.value);
          }}
          value={stext}
          type="text"
        />
        <button
          onClick={() => {
            foo();
          }}
        >
          submit
        </button>
        <p>{stext}</p>
        {/* <pre ref={p} dangerouslySetInnerHTML={{ __html: message }}></pre> */}
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
      </div>
    </>
  );
}

export default App;
