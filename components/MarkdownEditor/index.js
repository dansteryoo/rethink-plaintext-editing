import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
const Markdown = require('react-markdown');

function MarkdownEditor({ file, write }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [localValue, setLocalValue] = useState('');
  const [value, setValue] = useState(localValue);

  useEffect(() => {
    (async () => setValue(await file.text()))();
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
    setEditorLoaded(true);
    setLocalValue(localStorage.getItem(file.name) || localValue);
  }, [file]);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setValue(data);
    write(file, value);
  };

  return editorLoaded ? (
    <div className={css.editor_wrapper}>
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(e, editor) => handleChange(e, editor)}
      />
      <div className={css.editor_preview}>
        <Markdown
          source={value}
          escapeHtml={false}
        />
      </div>
    </div>
  ) : (
    <div>Editor loading</div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
