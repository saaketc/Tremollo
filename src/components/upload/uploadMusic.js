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
import { encode } from "../../utils/utilfunctions";

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
          window.location = `/content/${encode(data.body.contentId)}`;
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
          Choose a thumbnail for your music video
        </Typography>
      )}
      <br />
      <br />

      {thumbnail && (
        <img width="180" height="150" src={storageURL + thumbnail} alt="" />
      )}
      <br />
      <br />
      <Grid container spacing={6}>
        <br />
        <br />
        {uploading === "pending" ? (
          <div>
            <ReactLoading
              type="bars"
              color={colors.primary}
              height={150}
              width={150}
            />
            <br />
            <p style={{ color: colors.primary }}>
              Uploading your music... Sit back & relax!
            </p>
          </div>
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
          label="Add tags for the music uploaded"
          type="text"
          name="tags"
          placeholder="You can add multiple tags using a comma"
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
        <br />
        <br />
        <br />
        <br />
      </form>
    </Container>
  );
};

export default UploadMusic;
