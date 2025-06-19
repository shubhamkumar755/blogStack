import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'


export default function RTE({
    name, control, label, defaultValue=""
}) {
  return (
    <div className='w-full'>
        {label && 
        <label
        className="inline-block mb-1 pl-1">
        {label}    
        </label>}

        <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({field:{onChange,value}})=>(
            <Editor
                apiKey='bqwojbahvb556rq6rmzgzryr0dwgk76snimo1r4g16ebb0l8'
                value={value}
                onEditorChange={onChange} //if anything changes on editor, field is governed by "onChange"
                init={
                    {
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "help",
                            "wordcount"
                        ],
                        toolbar:
                            'undo redo | blocks | image | bold italic forecolor | alignleft aligncnter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | rmoveformat | help',
                        content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size:14px}",
                        
                    }
                }
                
            />
        )}
        />
    </div>
  )
}

