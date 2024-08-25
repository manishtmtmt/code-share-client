import React from "react";

const options = [
  { value: "light", content: "Light" },
  { value: "vs-dark", content: "Dark" },
];

const EditorTheme = ({ theme, handleChangeTheme }) => {
  return (
    <select
      name="theme"
      className="p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-[#CED6E1] text-black text-sm rounded-lg"
      value={theme}
      onChange={(e) => {
        const { value } = e.target;
        handleChangeTheme(value);
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

export default EditorTheme;
