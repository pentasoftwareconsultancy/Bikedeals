'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { default as ReactQuillType } from 'react-quill'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
  readOnly?: boolean
  className?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter your content...',
  height = '200px',
  readOnly = false,
  className = '',
}) => {
  const quillRef = useRef<ReactQuillType | null>(null)

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
    clipboard: { matchVisual: false },
  }

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'script', 'list', 'bullet', 'indent',
    'direction', 'align', 'link', 'image', 'video', 'blockquote', 'code-block',
  ]

  React.useEffect(() => {
  const style = document.createElement('style')
  style.textContent = `
    .ql-editor {
      min-height: ${height};
      font-family: inherit;
      font-size: 14px;
      line-height: 1.6;
    }
    .ql-toolbar {
      border-top: 1px solid #e5e7eb;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
      border-bottom: none;
      border-radius: 0.375rem 0.375rem 0 0;
    }
    .ql-container {
      border-bottom: 1px solid #e5e7eb;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 0.375rem 0.375rem;
    }
    .ql-editor:focus { outline: none; }
    .ql-toolbar.ql-snow { background: #f9fafb; }
    .ql-toolbar.ql-snow .ql-picker-label:hover,
    .ql-toolbar.ql-snow .ql-picker-item:hover,
    .ql-toolbar.ql-snow button:hover,
    .ql-toolbar.ql-snow button:focus,
    .ql-toolbar.ql-snow button.ql-active { color: #dc2626; }
    .ql-snow .ql-picker.ql-expanded .ql-picker-options {
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  `
  document.head.appendChild(style)
  return () =>{
    document.head.removeChild(style)
  }
}, [height])


  return (
    <div className={`rich-text-editor ${className}`}>
      {React.createElement(ReactQuill as any, {
        ref: quillRef,
        theme: 'snow',
        value,
        onChange,
        modules,
        formats,
        placeholder,
        readOnly,
      })}
    </div>
  )
}

export default RichTextEditor
