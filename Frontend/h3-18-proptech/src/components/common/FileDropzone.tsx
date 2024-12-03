import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloseIcon, DeleteIcon, EyeIcon, UploadIcon } from "../icons";
import { FieldError, Merge, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  fileType: "images" | "pdf" | "both";
  maxFiles: number;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  files?: File[]
}

export function FileDropzone({
  fileType,
  setValue,
  name,
  error,
  maxFiles,
  files
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
    const newFiles = Array.from(acceptedFiles);
    setSelectedFiles((files) => {
      const joinFiles = [...files, ...newFiles];
      if (joinFiles.length <= maxFiles) {
        return joinFiles;
      } else {
        toast.error(`No se pueden enviar más de ${maxFiles} archivos`);
        return files;
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: validFileType,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>(files ?? []);
  const [fileChosen, setFileChosen] = useState({
    open: false,
    type: "",
    src: "",
  });

  useEffect(() => {
    setValue(name, selectedFiles);
  }, [selectedFiles]);

  useEffect(() => {
    if (error?.message) toast.error(error.message);
  }, [error]);

  const viewFile = (file: File) => {
    const fileSrc = URL.createObjectURL(file);
    setFileChosen({ open: true, src: fileSrc, type: file.type });
  };

  const deleteFile = (fileToDelete: File) => {
    const updateFiles = selectedFiles.filter((file) => file !== fileToDelete);
    setSelectedFiles(updateFiles);
  };
  return (
    <>
      <article
        className={`flex flex-col pt-2 pb-6 px-6 border-[3px] border-primary rounded-2xl relative`}
      >
        <span className="text-center text-title-large-bold py-3">
          Sube tus archivos
        </span>
        <div
          {...getRootProps()}
          className="p-6 bg-tertiary flex flex-col gap-2 items-center justify-center rounded-xl"
        >
          <UploadIcon className="w-12 h-12" />
          <span className="text-body-large-regular max-w-[20ch] text-center">
            Haz click o arrastra y suelta los archivos aquí
          </span>
          <input
            {...getInputProps()}
            type="file"
            multiple
            className="opacity-0"
          />
        </div>
      </article>
      {selectedFiles.length > 0 && (
        <ul className="flex flex-col gap-4">
          {selectedFiles.map((file, index) => {
            return (
              <li
                key={`${file.name} - ${index}`}
                className="flex gap-4 justify-center"
              >
                <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary text-ellipsis max-w-[50vw] whitespace-nowrap overflow-hidden md:w-full">
                  {file.name}
                </div>
                <button
                  onClick={() => viewFile(file)}
                  type="button"
                  className="p-2 md:p-3 bg-background shadow-md shadow-tertiary rounded-lg hover:bg-tertiary transition-colors"
                >
                  <EyeIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteFile(file)}
                  className="p-2 md:p-3 bg-background shadow-md shadow-tertiary rounded-lg hover:bg-tertiary transition-colors"
                >
                  <DeleteIcon className="w-6 h-6 text-error" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <dialog
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
      </dialog>
    </>
  );
}

export default FileDropzone;
