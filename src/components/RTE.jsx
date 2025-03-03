import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    
    <div className='w-full'>
      {label && <label className='inline-block mb-3 pl-1'>{label}</label>}

      <Controller
      name={name || "content"}
      control = {control}
      render={({field:{onChange}}) => (
        <Editor
    initialValue= {defaultValue}
     apiKey="s7ra7dfiykf6o3vr16jnnfzmuvvf670v1o9xcprsk940sm4v"
    init = {
      {
        initialValue: defaultValue,
        height: 500,
        menubar: true,
        plugins:['advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],

        toolbar: 'undo redo | formatselect | bold italic backcolor | \ alighleft alighcenter alignright alignjustify |\ bullist numlist outdent indent | removeformat | help',
        content_style: "body { font-family:Helvetica, Arial,sans-serif; font-size:14px }"
      }}
      onEditorChange={onChange}
    />
      )}
      
      />
       </div>
  )
}




 <Editor
    
    initialValue='default value'
    init = {
      {branding: false,
        height: 500,
        menubar: false,
        plugins: [' autolink lists link image charmap print preview anchor visualblocks code fullscreen insertdatetime media table paste code help wordcount'],

        

        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',

        

      }
    }
    /> 