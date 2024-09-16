import axios from "axios";

const YouTubeService = {
  search: (req: string) => {
    const apikey = import.meta.env.VITE_API_KEY_YOU_TUBE_API;

    return axios.get(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&videoCaption=closedCaption&type=video&order=viewCount&maxResults=27&q=" +
        req +
        "&key=" +
        apikey
    );
  },
  transcript: (req: any) => {
    return axios.post("http://localhost:9000/transcript", req);
  },
};

export default YouTubeService;
