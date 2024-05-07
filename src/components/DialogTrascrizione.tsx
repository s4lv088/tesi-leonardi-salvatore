import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { jsPDF } from "jspdf";
import archivioJson from "../lib/archivio.json";
import fs from "vite-plugin-fs/browser";
import { useToast } from "./ui/use-toast";

type AggiornaUtenteDialog = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  videoId: string;
};

const DialogTrascrizione = ({
  open,
  setOpen,
  title,
  content,
  videoId,
}: AggiornaUtenteDialog) => {
  interface videoTranscript {
    id: string;
    transcript: string;
  }
  const { toast } = useToast();

  const archivia = () => {
    const videoTranscript: videoTranscript = {
      id: videoId,
      transcript: content,
    };
    const archivio: videoTranscript[] =
      archivioJson["archivio-video-transcript"];
    if (!archivio.find((item) => item.id === videoTranscript.id)) {
      archivio.push(videoTranscript);

      // Write the updated data back to the JSON file
      fs.writeFile("../lib/archivio.json", JSON.stringify(archivio, null, 2));

      toast({
        title: "Salvato nei preferiti",
        variant: "success",
      });
    } else {
      toast({
        title: "Già presente nei preferiti",
        variant: "warning",
      });
    }
  };
  const downloadTrascizione = () => {
    const doc = new jsPDF();

    doc.text(content, 20, 20, {
      maxWidth: 170,
    });
    doc.save(title + ".pdf");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col md:max-w-[725px] max-h-[calc(100dvh-40px)] overflow-auto ">
        <DialogHeader>
          <DialogTitle>Trascizione video</DialogTitle>
        </DialogHeader>

        <div className="flex flex-row justify-center">
          <h4>{title}</h4>
        </div>
        <div className="flex flex-row justify-center">
          {content ? <h4>{content}</h4> : <h4>Video non trascrivibile</h4>}
        </div>
        <div className="flex flex-row justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Annulla
          </Button>
          <Button type="button" onClick={downloadTrascizione}>
            Download
          </Button>
          <Button type="button" variant="secondary" onClick={archivia}>
            Archivia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogTrascrizione;
