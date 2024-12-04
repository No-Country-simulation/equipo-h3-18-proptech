import { useCallback, useEffect, useState } from "react";
import { FieldError, Merge, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { CloseIcon, UploadIcon } from "../icons";

interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  label: string;
  fileType: "images" | "pdf" | "both";
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  file?: File;
}

export function FileDropzone({ fileType, setValue, name, error, file }: Props) {
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
    setSelectedFiles(newFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: validFileType,
  });

  const [selectedFiles, setSelectedFiles] = useState<File | undefined>(file);

  useEffect(() => {
    setValue(name, selectedFiles);
  }, [selectedFiles]);

  useEffect(() => {
    if (error?.message) toast.error(error.message);
  }, [error]);

  const deleteFile = () => {
    setSelectedFiles(undefined);
  };
  return (
    <article className="flex flex-col min-w-[200px] min-h-[200px]">
      <label className="text-label-large-medium" htmlFor="">
        {name}
      </label>

      {selectedFiles !== undefined ? (
        <div className="relative border-[3px] border-primary rounded-2xl w-[260px] h-[260px]">
          <img
            src={URL.createObjectURL(selectedFiles)}
            alt="Hola Mundo"
            className="w-full h-full aspect-square rounded-2xl"
          />
          <button
            type="button"
            onClick={() => deleteFile()}
          >
            <CloseIcon className="absolute top-2 right-2 h-6 w-6 rounded-full p-1 bg-contrast cursor-pointer hover:bg-tertiary transition-colors" />
          </button>
        </div>
      ) : (
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
      )}

      {/* <dialog
        onClick={() => setFileChosen({ open: false, src: "", type: "" })}
        className={`${fileChosen.open ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4 top-0`}
      >
        {fileChosen.type !== "application/pdf" ? (
          <figure className="relative">
            <img
              src={fileChosen.src}
              alt="Hola Mundo"
              className="max-w-[250px] max-h-[250px] aspect-square md:max-w-[70vw] md:max-h-[70vh]"
            />
            <button
              type="button"
              onClick={() => setFileChosen({ open: false, src: "", type: "" })}
            >
              <CloseIcon className="absolute top-2 right-2 h-6 w-6 rounded-full p-1 bg-contrast cursor-pointer hover:bg-tertiary transition-colors" />
            </button>
          </figure>
        ) : (
          <div className="h-[300px] w-[300px] md:h-full md:w-full md:max-h-[80%] md:max-w-[80%] p-2 relative">
            <button
              type="button"
              onClick={() => setFileChosen({ open: false, src: "", type: "" })}
            >
              <CloseIcon className="absolute top-0 right-0 h-6 w-6 rounded-full p-1 bg-contrast cursor-pointer hover:bg-tertiary transition-colors" />
            </button>
            <iframe className="w-full h-full" src={fileChosen.src}></iframe>
          </div>
        )}
      </dialog> */}
    </article>
  );
}

export default FileDropzone;
