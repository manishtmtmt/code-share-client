import React from "react";
import MonacoEditor from "./Editor/MonacoEditor";

const Content = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <img src="/assets/NoteCodeLogo.svg" alt="notecode-logo" />
      <p className="text-2xl font-semibold">Create & Share</p>
      <p className="text-4xl font-semibold">Your Code Easily</p>
      <div className="mt-3 md:mt-4">
        <MonacoEditor />
      </div>
    </div>
  );
};

export default Content;
