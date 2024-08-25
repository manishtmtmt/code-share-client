import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import EditorLanguages from "./EditorLanguages";
import EditorTheme from "./EditorTheme";
import { DEFAULT_CODES } from "../../constants/defaultCodes";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SERVER_URL =
  "https://code-sharing-app-server-ahygp1o9v-manishtmtmts-projects.vercel.app";

const MonacoEditor = () => {
  const { codeId } = useParams();
  const navigate = useNavigate();

  const [language, setLanguage] = useState("html");
  const [theme, setTheme] = useState("light");
  const [code, setCode] = useState(DEFAULT_CODES);
  const [shareDisable, setShareDisable] = useState(false);

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleChangeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const handleCopy = () => {
    const { href } = location;
    navigator.clipboard
      .writeText(href)
      .then(() => toast.success("Link copied!"));
  };

  const saveCode = async () => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/save-code`, code);

      toast.success("Your code has been save, copy the link below to share");
      navigate(`/${data.data.code_id}`);
      setShareDisable(true);
    } catch (error) {
      console.log("Failed to share code", error);
      toast.error("Failed to share your code");
    }
  };

  const updateCode = async () => {
    try {
      const { data } = await axios.put(
        `${SERVER_URL}/update-code/${codeId}`,
        code
      );

      toast.success("Your code updated successfully, copy the url to share");
    } catch (error) {
      console.log("Failed to update code", error);
      toast.error("Failed to update your code");
    }
  };

  const handleShare = () => {
    if (codeId) {
      updateCode();
    } else {
      saveCode();
    }
  };

  const handleCodeChange = (value) => {
    if (shareDisable) setShareDisable(false);

    setCode({
      ...code,
      [language]: value,
    });
  };

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const { data } = await axios(`${SERVER_URL}/get-code/${codeId}`);

        setCode({
          html: data.data.html,
          css: data.data.css,
          javascript: data.data.javascript,
        });
        setShareDisable(true);
      } catch (error) {
        console.log("Error while getting code", error);
        toast.error("Failed to get code, Please check your url");
        navigate("/");
      }
    };

    if (codeId) fetchCode();
  }, []);

  return (
    <div
      className={`w-[90vw] lg:w-[880px] p-4 rounded-xl shadow-2xl ${
        theme === "light" ? "bg-white" : "bg-[#1e1e1e]"
      }`}
    >
      <Editor
        theme={theme}
        height={"360px"}
        width={"100%"}
        value={code[language]}
        language={language}
        onChange={handleCodeChange}
        options={{
          fontFamily: "Outfit",
          fontLigatures: true,
          fontWeight: 500,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      <div className="mt-3 flex flex-wrap gap-3 justify-between">
        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center">
          <EditorLanguages
            language={language}
            handleChangeLanguage={handleChangeLanguage}
          />
          <EditorTheme theme={theme} handleChangeTheme={handleChangeTheme} />
        </div>
        <div className="flex flex-wrap gap-5 w-full md:w-auto justify-center">
          {codeId?.length && (
            <button className="flex items-center gap-2" onClick={handleCopy}>
              <img src="/assets/link.svg" alt="link" />
              <p className="text-gray-500">.../{codeId.substring(0, 10)}</p>
            </button>
          )}
          <button
            className="p-2 flex flex-wrap items-center gap-3 bg-blue-500 text-white rounded-xl disabled:bg-gray-500"
            disabled={shareDisable}
            onClick={handleShare}
          >
            {codeId?.length ? (
              "Update Code"
            ) : (
              <>
                <img src="/assets/Share.svg" alt="share-img" />
                Share
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonacoEditor;
