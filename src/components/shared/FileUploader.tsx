import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';

interface FileUploaderProps {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string | URL;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div
      className='flex flex-col flex-center bg-dark-3 rounded-xl'
      {...getRootProps()}
    >
      <input className='cursor-pointer' {...getInputProps()} />
      {fileUrl ? (
        // ----------------------------    При наличии файла
        <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            {/* TODO: {ПРОВЕРИТЬ КАК ЛУЧШЕ ИЗОБРАЖЕНИЕ НА РАЗНЫХ РАЗРЕШЕНИЯХ} */}
            <img
              src={fileUrl}
              alt='User added image'
              className='file_uploader-img'
            />
          </div>
          <span className='file_uploader-label'>
            Click or drag photo to replace
          </span>
        </>
      ) : (
        // ----------------------------    При отсутствии файла
        <div className='file_uploader-box'>
          <img
            src='/assets/icons/file-upload.svg'
            alt='File Upload, Image'
            width={96}
            height={77}
          />
          <h3 className='base-medium text-light-2 mb-2 mt-6'>
            Drag photo here
          </h3>
          <span className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</span>
          <Button className='shad-button_dark_4'>Select from device</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
