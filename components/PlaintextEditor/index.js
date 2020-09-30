import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './style.css';

function PlaintextEditor({ file, write }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Codeblock } = editorRef.current || {};
  const [value, setValue] = useState(value);

  useEffect(() => {
    (async () => setValue(await file.text()))();
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      Codeblock: require('@ckeditor/ckeditor5-code-block/src/codeblock')
    };
    setEditorLoaded(true);
  }, []);


  return editorLoaded ? (
    <div className={css.editor_wrapper}>
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(e, editor) => {
          const data = editor.getData();
          setValue(data);
          write(file, value);
        }}
      />
      <div className={css.editor_preview}>{value}</div>
    </div>
  ) : (
    <div>Editor loading</div>
  );
  
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
