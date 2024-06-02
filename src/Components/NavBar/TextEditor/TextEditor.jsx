import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./textEditor.scss";

function TextEditor({handleChange}){

    return(
        <ReactQuill className='description-editor' theme='snow' onChange={handleChange}></ReactQuill>
    )
}

export default TextEditor