import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // React Quill এর CSS

const BodyInput = ({ setValue, value }) => {

    // const [value, setValue] = useState('');
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // Formatting options
        [{ 'color': [] }, { 'background': [] }], // Text color and background color
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
        [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript and superscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
        [{ 'align': [] }], // Text alignment
        ['link', 'image', 'video'], // Links, images, and videos
        ['clean'], // Remove formatting
        ['blockquote', 'code-block'], // Blockquote and code block
    ];
    // const toolbarOptions = [
    //     [{ 'header': [1, 2, false] }], // Headers
    //     ['bold', 'italic', 'underline', 'strike'], // Formatting options
    //     [{ 'color': [] }, { 'background': [] }], // Text color and background color
    //     [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
    //     [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript and superscript
    //     ['link'], // Links, images, and videos
    //     ['clean'], // Remove formatting
    //     ['code-block'], // Blockquote and code block
    // ];



    return (
        <div className="relative">
    {/* Moved the label above the editor */}
    <label className='text-sm mb-3 block px-3 text-slate-400'>Body</label>
    <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
        className="shadow-md"
    />
</div>

    );
};

export default BodyInput;
