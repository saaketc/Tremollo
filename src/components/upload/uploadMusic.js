import React from "react";
import { toast } from "react-toastify";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";

import dataService from "../../services/dataServices";
import { storageURL } from "../../config/storage";
import colors from "../../config/colors";
import TextForm from "../common/textForm";
import { buttonStyleClose } from "../../config/buttonStyle";

const UploadMusic = ({ user }) => {
  const [fileData, setFileData] = React.useState({});
  const [thumbnail, setThumbnail] = React.useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      caption: "",
      tags: "",
    },
    onSubmit: async (values) => {
      try {
        const toSend = {
          ...values,
          thumbnailLink: thumbnail,
          userId: user.userId,
          fileId: fileData.fileId,
        };
        const { data } = await dataService.putData(
          "content/upload/file",
          toSend
        );
          console.log(data.body);
          toast.success('Yaayy! Successfully uploaded.')
      } catch (e) {
        console.log(e.message);
        toast.error("Oops! Something went wrong.");
      }
    },
  });
  React.useEffect(() => {}, [fileData]);

  const handleChange = async ({ currentTarget }) => {
    try {
      let formData = new FormData();
      formData.append("file", currentTarget.files[0]);
      const { data } = await dataService.putData(
        "content/upload/file",
        formData,
        "multipart/form-data"
      );
      console.log(data.body);
      setFileData(data.body);
    } catch (e) {
      toast.error("Something went wrong while uploading...");
      console.log(e.message);
    }
  };
  const handlePickThumbnail = (thumbnail) => {
    return setThumbnail(thumbnail);
  };

  return (
    <Container>
      <form>
        <input type="file" name="file" onChange={handleChange} />
      </form>
      {Object.keys(fileData).length > 0 &&
        fileData.fileThumbnails.split(",").map((t) => (
          <Button onClick={() => handlePickThumbnail(t)}>
            <img
              src={storageURL + t}
              alt="thumbnail"
              width="100%"
              height="100"
              style={{
                border: `5 px solid ${colors.primary}`,
                borderRadius: "50%",
              }}
            />
          </Button>
        ))}
          <br/>
          <br/>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextForm
          label="Title of the content"
          type="text"
          name="title"
          required={true}
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <br />
        <TextForm
          label="Caption for the content"
          type="text"
          name="caption"
          multiline={true}
          rows="2"
          required={true}
          value={formik.values.caption}
          onChange={formik.handleChange}
        />
        <br />

        <TextForm
          label="Add tags"
          type="text"
          name="tags"
          placeholder="Add comma separated tags for your content"
          required={true}
          value={formik.values.tags}
          onChange={formik.handleChange}
        />
        <br />

        <Button style={ buttonStyleClose } type="submit">
          Upload
        </Button>
      </form>
    </Container>
  );
};

export default UploadMusic;
