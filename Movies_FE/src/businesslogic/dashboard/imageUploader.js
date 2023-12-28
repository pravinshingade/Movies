import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useTranslation } from "react-i18next";

const ImageUploader = ({ file, setFile, isEdit = false }) => {
  const { t } = useTranslation();

  const [isCustomPreview, setIsCustomPreview] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsCustomPreview(true);
    const uploadedFiles = Array.from(event.dataTransfer.files);

    if (
      uploadedFiles.length === 1 &&
      ["image/png", "image/jpeg"].includes(uploadedFiles[0].type)
    ) {
      setFile(uploadedFiles[0]);
    } else {
      alert("Please drop a single valid image file (PNG or JPEG).");
    }
  };

  return (
    <div className="max-height-draggable">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="upload-draggable-text max-height-draggable"
      >
        {!file && (
          <>
            <LoginIcon className="upload-icons white-color" />
            <p className="white-color">{t("drop_an_image_here")}</p>
          </>
        )}
        {file && (
          <div>
            <img
              src={isEdit && !isCustomPreview ? `data:image/png;base64,${file}` : URL.createObjectURL(file)}
              alt="Preview"
              className="image-preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
