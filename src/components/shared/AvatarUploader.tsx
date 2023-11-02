import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import UserAvatar from './UserAvatar';

interface AvatarUploaderProps {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string | URL;
}

const AvatarUploader = ({ fieldChange, mediaUrl }: AvatarUploaderProps) => {
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
      className='flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer'
      {...getRootProps()}
    >
      <input className='cursor-pointer' {...getInputProps()} />
      {fileUrl && (
        // ----------------------------    При наличии файла
        <>
          <div className='flex flex-1 items-center gap-5 w-full p-5 lg:p-10'>
            {/* {  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore} */}
            <UserAvatar size='medium' imageUrl={fileUrl} />
            <span className='text-[#0095F6]'>Click or drag photo to edit</span>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarUploader;
