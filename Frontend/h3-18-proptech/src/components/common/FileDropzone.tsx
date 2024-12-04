import { useCallback, useEffect, useState } from "react";
import { FieldError, Merge, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { CloseIcon, UploadIcon } from "../icons";
import PDFIcon from "../icons/PDFIcon";

interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
  fileType: "images" | "pdf" | "both";
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  file?: File;
}

export function FileDropzone({
  fileType,
  setValue,
  name,
  error,
  file,
  label,
}: Props) {
  let validFileType;
  switch (fileType) {
    case "images":
      validFileType = {
        "image/jpeg": [],
        "image/png": [],
      };
      break;
    case "pdf":
      validFileType = {
        "application/pdf": [],
      };
      break;
    default:
      validFileType = {
        "image/jpeg": [],
        "image/png": [],
        "application/pdf": [],
      };
      break;
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles[0];
    setUploadedFile(newFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: validFileType,
  });

  const [UploadedFile, setUploadedFile] = useState<File | undefined>(file);

  useEffect(() => {
    setValue(name, UploadedFile);
  }, [UploadedFile]);

  useEffect(() => {
    if (error?.message) toast.error(error.message);
  }, [error]);

  const deleteFile = () => {
    setUploadedFile(undefined);
  };
  return (
    <article className="flex flex-col min-w-[200px] min-h-[200px] mx-auto">
      <label className="text-label-large-medium mb-2" htmlFor="">
        {label}
      </label>

      {!UploadedFile ? (
        <div
          className="flex flex-col items-center justify-center border-[3px] border-primary rounded-2xl bg-tertiary h-[260px] w-[260px]"
          {...getRootProps()}
        >
          <UploadIcon className="w-12 h-12" />
          <span className="text-body-large-regular max-w-[20ch] text-center">
            Haz click o arrastra y suelta los archivos aquí
          </span>
          <input
            {...getInputProps()}
            type="file"
            multiple={false}
            className="opacity-0"
          />
        </div>
      ) : UploadedFile.type !== "application/pdf" ? (
        <div className="relative border-[3px] border-primary rounded-2xl w-[260px] h-[260px] select-none">
          <img
            src={URL.createObjectURL(UploadedFile)}
            alt="Hola Mundo"
            className="w-full h-full aspect-square rounded-xl"
          />
          <button type="button" onClick={() => deleteFile()}>
            <CloseIcon className="absolute top-2 right-2 h-6 w-6 rounded-full p-1 bg-contrast cursor-pointer hover:bg-tertiary transition-colors" />
          </button>
        </div>
      ) : (
        <div className="relative border-[3px] border-primary rounded-2xl w-[260px] h-[260px] select-none flex flex-col items-center justify-center p-3">
          <PDFIcon className="w-48 h-48"/>
          <span className="text-label-large-medium mt-2">{UploadedFile.name}</span>
          <button type="button" onClick={() => deleteFile()}>
            <CloseIcon className="absolute top-2 right-2 h-7 w-7 rounded-full p-1 bg-contrast cursor-pointer hover:bg-tertiary transition-colors" />
          </button>
        </div>
      )}
    </article>
  );
}

export default FileDropzone;
