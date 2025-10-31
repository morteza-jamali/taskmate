import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'motion/react';
import Image from './Image';
import { css } from '@emotion/react';
import { InputWrapper, type InputWrapperProps } from './InputWrapper';

import PhotoImg from '@/src/assets/photo.svg?react';

export interface ImageDropzoneProps
  extends Pick<InputWrapperProps, 'label' | 'error'> {
  hint?: string;
  name?: string;
}

const getPresentationStyles = ({
  error,
}: Pick<ImageDropzoneProps, 'error'>) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  background-color: var(--black-1);
  border-radius: 8px;
  padding: 50px;
  cursor: pointer;
  transition: all 0.2s;
  ${error && 'border: 1px solid var(--red-1);'}

  &:hover {
    background-color: var(--black-5);
  }

  & > svg {
    width: 52px;
    height: 52px;
    color: var(--black-6);
  }
`;

const thumbImgStyles = css`
  object-fit: cover;
  position: absolute;
  inset: 0;
  width: 90%;
  height: 90%;
  margin: auto;
`;

const thumbRootStyles = css`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
  position: relative;

  &:hover button {
    opacity: 1;
  }
`;

const removeBtnStyles = css`
  background-color: var(--red-1);
  z-index: 1;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
  margin-left: auto;
  opacity: 0;

  &:hover {
    background-color: red;
  }

  &::before {
    content: 'x';
  }
`;

const imageDropzoneTextStyles = css`
  display: flex;
  flex-direction: column;

  & p {
    text-align: center;
  }

  & p:first-of-type {
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
    line-height: 20px;
    color: var(--text-color-1);
  }

  & p:nth-of-type(2) {
    color: var(--black-6);
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    margin-top: 7px;
  }
`;

const thumbsContainerStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

type NewFileType = File & Record<'preview' | 'dataUrl' | 'path', string>;

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  hint,
  name,
  label,
  error,
}) => {
  const [files, setFiles] = useState<NewFileType[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
            dataUrl: '',
          });
          const reader = new FileReader();
          reader.onloadend = function () {
            newFile.dataUrl = reader.result as string;
          };
          reader.readAsDataURL(acceptedFiles[0]);

          return newFile as unknown as NewFileType;
        }),
      );
    },
  });

  const removeImage = (preview: string) =>
    setFiles(files.filter((f) => f.preview !== preview));

  const thumbs = files.map((file) => (
    <motion.div
      css={thumbRootStyles}
      key={file.name}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={file.preview}
        alt="preview"
        css={thumbImgStyles}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <button css={removeBtnStyles} onClick={() => removeImage(file.preview)} />
    </motion.div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <InputWrapper {...{ label, error }}>
      <section>
        <input
          type="hidden"
          {...{ name }}
          defaultValue={
            files.length === 0
              ? ''
              : JSON.stringify(
                  files.map((file) => ({
                    dataUrl: file.dataUrl,
                    path: file.path,
                  })),
                )
          }
        />
        <div {...getRootProps()} css={getPresentationStyles({ error })}>
          <input {...getInputProps()} />
          <PhotoImg />
          <div css={imageDropzoneTextStyles}>
            <p>Drag images here or click to select files</p>
            {hint && <p>{hint}</p>}
          </div>
        </div>
        <aside
          css={[
            thumbsContainerStyles,
            css`
              ${thumbs.length === 0 && 'margin: 0;'}
            `,
          ]}
        >
          <AnimatePresence initial={false}>{thumbs}</AnimatePresence>
        </aside>
      </section>
    </InputWrapper>
  );
};

export default ImageDropzone;
