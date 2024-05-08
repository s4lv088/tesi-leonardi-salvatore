import { ButtonLoading } from "@/components/button-loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLoader } from "@/context/AppContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import CCInput from "@/components/ui/cc-input";
import { zodResolver } from "@hookform/resolvers/zod";
import YouTubeService from "@/services/YoutubeService";
import { Form } from "@/components/ui/form";
import logo from "../assets/youtube-logo.png";
import { YoutubeTranscript } from "youtube-transcript";
import DialogTrascrizione from "@/components/DialogTrascrizione";
import { htmlToText } from "@/lib/utils";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const zodSchemaRicerca = z.object({
  fieldCerca: z.string({ required_error: "Campo obbligatorio" }).min(1, {
    message: "Campo obbligatorio",
  }),
});

interface responseItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const loader = useLoader();
  const { toast } = useToast();
  const [data, setData] = useState<responseItem[]>([]);
  const [trascrizione, setTrascrizione] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [languageSelected, setLanguageSelected] = useState<{
    [key: string]: string;
  }>({});
  const [searched, setSearched] = useState(false);

  const languages = [
    {
      desc: "Italiano",
      value: "it",
    },
    {
      desc: "Inglese",
      value: "en",
    },
    {
      desc: "Tedesco",
      value: "de",
    },
    {
      desc: "Spagnolo",
      value: "es-ES",
    },
    {
      desc: "Francese",
      value: "fr",
    },
  ];
  const form = useForm<z.infer<typeof zodSchemaRicerca>>({
    resolver: zodResolver(zodSchemaRicerca),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (values: z.infer<typeof zodSchemaRicerca>) => {
    try {
      setIsSearching(true);
      loader.show();
      const req = values.fieldCerca;
      const res = await YouTubeService.search(req);
      if (res) {
        setData(res?.data.items);
        setSearched(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Attenzione",
        variant: "destructive",
        description: "Errore interno, riprova!",
      });
    } finally {
      setIsSearching(false);
      loader.hide();
    }
  };

  const transcriptLanguage = (lang: string) => {
    if (lang) {
      return {
        lang: lang,
      };
    }
  };

  const trascrivi = async (id: string, title: string, name: string) => {
    try {
      let lang = "";
      if (name in languageSelected) {
        lang = languageSelected[name] ?? "";
      }

      YoutubeTranscript.fetchTranscript(id, transcriptLanguage(lang))
        .then((res) => {
          let trascrizione = "";
          res.map((item) => {
            trascrizione = trascrizione + " " + item.text;
          });

          const encodedTranscript = htmlToText(trascrizione);
          setTrascrizione(encodedTranscript ?? "");
          setTitle(title);
          setVideoId(id);

          setOpenDialog(true);
        })
        .catch((err) => {
          toast({
            title:
              "Attenzione ,il video non può essere trascritto nella lingua scelta",
            variant: "destructive",
            description: err?.message,
          });
        });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Attenzione",
        variant: "destructive",
        description: "Non è possibile effettuare la trascrizione del video.",
      });
    }
  };

  const onChangeLang = (event: { target: { name: string; value: string } }) => {
    setLanguageSelected({
      ...languageSelected,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-3 mb-8">
        <img
          src={logo}
          className="lg:w-[69px] h-fit md:w-[69px] h-fit w-[69px] h-[69px] "
        />
        <div className="flex items-center text-4xl font-bold">
          Youtube TRANSCRIPT
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
            <CCInput
              control={form.control}
              name="fieldCerca"
              label=""
              placeholder="Cerca video youtube"
            />
          </div>

          <div className="flex justify-end">
            {isSearching ? (
              <ButtonLoading />
            ) : (
              <Button type="submit" className="min-w-24">
                Cerca
              </Button>
            )}
          </div>
        </form>
      </Form>

      {data?.length === 0 && searched ? (
        <Alert variant="warning" className="mt-6 w-full">
          <AlertTitle className="flex items-center">
            <InfoCircledIcon className="min-w-10 min-h-10 mr-2" />
            Nessun risultato
          </AlertTitle>
        </Alert>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-12">
          {data?.map((item: responseItem, index) => {
            return (
              <div className="flex flex-col gap-2">
                <iframe
                  height="315"
                  className="w-full rounded-[32px]"
                  src={"https://www.youtube.com/embed/" + item?.id?.videoId}
                ></iframe>

                <div className="flex flex-col gap-3">
                  <label>
                    Lingua:
                    <select
                      name={"lang_selected_" + index}
                      onChange={onChangeLang}
                    >
                      <option value="">Default</option>
                      {languages.map((item) => {
                        return <option value={item.value}>{item.desc}</option>;
                      })}
                    </select>
                  </label>
                  <Button
                    type="button"
                    onClick={() =>
                      trascrivi(
                        item.id.videoId,
                        item?.snippet?.title,
                        "lang_selected_" + index
                      )
                    }
                  >
                    Trascrivi
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DialogTrascrizione
        open={openDialog}
        setOpen={setOpenDialog}
        title={title}
        content={trascrizione}
        videoId={videoId}
      />
    </div>
  );
}
