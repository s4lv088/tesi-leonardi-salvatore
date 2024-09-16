/*
 * Caching client:
 * - 5 minuti per le pagine generate, non attiva se DISABLE_CACHE=true
 * - 30 minuti per gli assets statici
 */
import axios from "axios";
import cors from "cors";
import express from "express";
import { YoutubeTranscript } from "youtube-transcript";

console.log("###################################");
console.log("######### Server starting #########");
console.log("###################################");

const PORT = 9000;
axios.defaults.timeout = 150000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

//path senza redirect relativi a liferay
app.post("/transcript", async function (req, res) {
  console.log("Ricevuto una richiesta POST", req?.body?.id);
  const language = { lang: req?.body?.lang };
  try {
    let response = await YoutubeTranscript.fetchTranscript(
      req?.body?.id,
      language ?? null
    );

    res.send(JSON.stringify(response));
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
