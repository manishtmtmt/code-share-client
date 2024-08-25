import React from "react";

const options = [
  { value: "html", content: "HTML" },
  { value: "css", content: "CSS" },
  { value: "javascript", content: "JavaScript" },
];

const EditorLanguages = ({ language, handleChangeLanguage }) => {
  return (
    <select
      name="language"
      className="p-2 outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm rounded-lg bg-[#CED6E1]"
      value={language}
      onChange={(e) => {
        const { value } = e.target;
        handleChangeLanguage(value);
      }}
    >
      {options.map(({ value, content }) => (
        <option value={value} key={value}>
          {content}
        </option>
      ))}
    </select>
  );
};

export default EditorLanguages;
