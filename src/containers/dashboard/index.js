import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useMergeState } from "../../utils/custom-hooks";
import { createTweet, deleteTweet, getTweet } from "../../api";

export default function DashboardContainer() {
  const [state, setState] = useMergeState({
    tweet: {},
    readTweetId: "",
    deleteTweetId: "",
    newTweet: "",
    message: "",
  });

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleReadTweet = async () => {
    try {
      const response = await getTweet({ id: state.readTweetId });
      setState({ tweet: response });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTweet = async () => {
    if (!state.newTweet) {
      return;
    }

    const response = await createTweet({ text: state.newTweet });

    console.log("response : ", response);

    if (response?.id) {
      setState({ message: "Tweet created successfully!" });
    } else {
      setState({ message: "Failed to create tweet." });
    }
  };

  const handleDeleteTweet = async () => {
    const response = await deleteTweet({ id: state?.deleteTweetId });

    if (response?.deleted) {
      setState({ message: "Tweet deleted successfully!", tweet: {} });
    } else {
      setState({ message: "Failed to delete tweet.", tweet: {} });
    }
  };

  const handleCloseAlert = () => {
    setState({ message: "" });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4">
        <div className="mt-2">
          <div className="text-xl font-semibold">Create Tweet</div>

          <div className="mt-2">
            <TextField
              fullWidth
              name="newTweet"
              placeholder="What's happening?"
              multiline
              minRows={4}
              value={state.newTweet}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end mt-4">
            <div
              className="flex justify-center items-center w-20 tweet-btn font-semibold text-white rounded-full h-8 cursor-pointer hover:opacity-80"
              onClick={handleCreateTweet}
            >
              Tweet
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10">
          <div className="text-xl font-semibold">Read tweet by ID</div>

          <div className="mb-4 mt-2">
            <TextField
              fullWidth
              name="readTweetId"
              placeholder="Enter tweet ID to read"
              value={state.readTweetId}
              onChange={handleChange}
            />
          </div>

          <div
            className="flex justify-center items-center w-40 tweet-btn font-semibold text-white rounded-full h-8 cursor-pointer hover:opacity-80"
            onClick={handleReadTweet}
          >
            Read Tweet
          </div>

          {state?.tweet?.id && (
            <div className="card h-24 min-h-full p-4 my-4 flex justify-between items-center">
              <div>{state?.tweet?.text}</div>

              <IconButton color="primary" onClick={handleDeleteTweet}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-10">
          <div className="text-xl font-semibold">Delete tweet by ID</div>

          <div className="mb-4 mt-2">
            <TextField
              fullWidth
              name="deleteTweetId"
              placeholder="Enter tweet ID to delete"
              value={state.deleteTweetId}
              onChange={handleChange}
            />
          </div>

          <div
            className="flex justify-center items-center w-40 tweet-btn font-semibold text-white rounded-full h-8 cursor-pointer hover:opacity-80"
            onClick={handleDeleteTweet}
          >
            Delete Tweet
          </div>
        </div>
      </div>

      {state?.message && (
        <Snackbar
          open={!!state?.message}
          autoHideDuration={20000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="info">{state?.message}</Alert>
        </Snackbar>
      )}
    </div>
  );
}
