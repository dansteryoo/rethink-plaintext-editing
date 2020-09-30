import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import { CopyBlock, atomOneDark } from 'react-code-blocks';

function SyntaxPreview({ file, write }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [value, setValue] = useState(value);

  useEffect(async () => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    };
    setValue(await file.text());
    setEditorLoaded(true);
  }, []);


  return editorLoaded ? (
    <div className={css.editor_wrapper}>
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        onChange={editor => {
          const data = editor?.getData();
          setValue(data);
          write(file, value);
        }}
      />
      <div className={css.editor_preview}>
        <CopyBlock text={value} language="javascript" theme={atomOneDark} />
      </div>
    </div>
  ) : (
    <div>Editor loading</div>
  );
}

SyntaxPreview.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default SyntaxPreview;
