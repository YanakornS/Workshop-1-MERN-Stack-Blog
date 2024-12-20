import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);

  // Expose the Quill editor instance to the parent component
  useImperativeHandle(ref, () => ({
    getQuill: () => {
      return quillRef.current.getEditor();
    },
  }));

  const toolbarOption = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOption,
  };

  return (
    <div className="content h-full max-h-screen overflow-y-auto">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange} // Corrected to onChange
        modules={modules}
        bounds="#scrolling-container"
      />
    </div>
  );
});

export default Editor;
