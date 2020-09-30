import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import { CopyBlock, atomOneDark } from 'react-code-blocks';

function SyntaxPreview({ file, write }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, CodeBlock } = editorRef.current || {};
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

  const editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'codeBlock'
    ],
    plugins: [CodeBlock],
    codeBlock: {
      languages: [
        { language: 'javascript', label: 'Javascript' },
      ]
    }
  };


  return editorLoaded ? (
    <div className={css.editor_wrapper}>
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        config={editorConfig}
        onChange={(e, editor) => {
          const data = editor.getData();
          setValue(data);
          write(file, value);
        }}
      />
      <div className={css.editor_preview}>
        {value}
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
