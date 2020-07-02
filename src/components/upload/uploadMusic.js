import React from "react";
import { toast } from "react-toastify";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";

import dataService from "../../services/dataServices";
import { storageURL } from "../../config/storage";
import colors from "../../config/colors";
import TextForm from "../common/textForm";
import { buttonStyleOpen } from "../../config/buttonStyle";
// import darkTheme from "../../config/themes/dark";
import MediaCard from "../common/mediaCard";
import ReactLoading from "react-loading";

const UploadMusic = ({ user }) => {
  const [fileData, setFileData] = React.useState({});
  const [thumbnail, setThumbnail] = React.useState("");
  const [uploading, setUploading] = React.useState("");
  const [uploadDisable, setUploadDisable] = React.useState(true);

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
        const { data } = await dataService.postData(
          "content/upload/data",
          toSend
        );
        // console.log(data.body);
        if (data.body !== null) {
          toast.success("Yaayy! Successfully uploaded.");
        } else {
          toast.error("Something went wrong! try again.");
        }
      } catch (e) {
        console.log(e.message);
        toast.error("Oops! Something went wrong.");
      }
    },
  });
  React.useEffect(() => {}, [fileData]);

  const handleChange = async ({ currentTarget }) => {
    try {
      setUploading("pending");

      if (currentTarget.files[0].size > 100 * 1048576) {
        setUploading("");

        return toast.error("Please upload a less than 100 MB video");
      }

      let formData = new FormData();
      formData.append("file", currentTarget.files[0]);
      const { data } = await dataService.putData(
        "content/upload/file",
        formData,
        "multipart/form-data"
      );
      // console.log(data.body);
      setFileData(data.body);
      setUploading("done");
      setUploadDisable(false);
    } catch (e) {
      toast.error("Something went wrong while uploading! try again.");
      setUploading("");

      console.log(e.message);
    }
  };
  const handlePickThumbnail = (thumbnail, index) => {
    return setThumbnail(thumbnail);
  };

  return (
    <Container>
      <form>
        <Button style={buttonStyleOpen}>
          <label for="upload">Choose Music</label>
        </Button>
        <input
          id="upload"
          type="file"
          name="file"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </form>
      <br />
      <br />
      {Object.keys(fileData).length > 0 && (
        <Typography variant="h4">
          Pick a thumbnail for your music video
        </Typography>
      )}
      <br />
      <br />

      {thumbnail && (
        <img width="330" height="300" src={storageURL + thumbnail} alt="" />
      )}
      <br />
      <br />
      <Grid container spacing={6}>
        <br />
        <br />
        {uploading === "pending" ? (
          <ReactLoading
            type="bars"
            color={colors.primary}
            height={150}
            width={150}
          />
        ) : (
          <>
            {Object.keys(fileData).length > 0 &&
              fileData.fileThumbnails.split(",").map((t, index) => (
                <>
                  {index < 4 && (
                    <Grid item xs={12} md={3} lg={3} key={t}>
                      <MediaCard
                        data={t}
                        image={storageURL + t}
                        onClick={handlePickThumbnail}
                        imageTitle="Thumbnail"
                      />
                    </Grid>
                  )}
                </>
              ))}
          </>
        )}
      </Grid>

      <br />
      <br />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextForm
          label="Title of the content"
          type="text"
          name="title"
          required={true}
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <br />
        <TextForm
          label="Caption for the content"
          type="text"
          name="caption"
          rows="2"
          fullWidth
          value={formik.values.caption}
          onChange={formik.handleChange}
        />
        <br />

        <TextForm
          label="Add tags"
          type="text"
          name="tags"
          placeholder="Add comma separated tags for your content"
          fullWidth
          value={formik.values.tags}
          onChange={formik.handleChange}
        />
        <br />
        {!uploadDisable && (
          <Button style={buttonStyleOpen} type="submit">
            Upload
          </Button>
        )}
      </form>
    </Container>
  );
};

export default UploadMusic;
