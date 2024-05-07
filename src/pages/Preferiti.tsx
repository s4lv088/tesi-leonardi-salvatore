import { useEffect, useState } from "react";
import archivioJson from "../lib/archivio.json";
import CCPageTitle from "@/components/ui/cc-page-title";
import logo from "../assets/youtube-logo.png";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, TrashIcon } from "lucide-react";
import { useLoader } from "@/context/AppContext";
import { useToast } from "@/components/ui/use-toast";
import fs from "vite-plugin-fs/browser";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface preferitiItem {
  id: string;
  transcript: string;
}
export default function Preferiti() {
  const [data, setData] = useState<preferitiItem[]>([]);
  const loader = useLoader();
  const { toast } = useToast();

  const recuperaFromArchivio = () => {
    loader.show();
    const archivio: preferitiItem[] = archivioJson["archivio-video-transcript"];

    setData(archivio);
    loader.hide();
  };

  useEffect(() => {
    recuperaFromArchivio();
  }, []);

  const rimuovi = (index: number) => {
    loader.show();
    const archivioTemp: preferitiItem[] =
      archivioJson["archivio-video-transcript"];
    const archivio = archivioTemp.splice(index, 1);

    // Write the updated data back to the JSON file
    fs.writeFile("../lib/archivio.json", JSON.stringify(archivio, null, 2));
    loader.hide();
    toast({
      title: "Rimosso dai preferiti",
      variant: "success",
    });
  };

  return (
    <div>
      <CCPageTitle>
        <div className="flex flex-row align-center gap-3">
          <img src={logo} className="flex" />
          <div className="flex">Preferiti</div>
        </div>
      </CCPageTitle>

      {data?.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {data?.map((item: preferitiItem, index: number) => {
            return (
              <div className="flex flex-col gap-2">
                <div className="flex justify-end">
                  <TrashIcon onClick={() => rimuovi(index)} />
                </div>
                <iframe
                  height="315"
                  className="w-full rounded-[32px]"
                  src={"https://www.youtube.com/embed/" + item?.id}
                ></iframe>

                <div className="flex flex-col w-full">
                  {item.transcript && (
                    <Collapsible>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Trascizione</h4>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronsUpDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="space-y-2">
                        {item.transcript}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Alert variant="warning" className="mt-6 w-full">
          <AlertTitle className="flex items-center">
            <InfoCircledIcon className="min-w-10 min-h-10 mr-2" />
            Nessun risultato
          </AlertTitle>
        </Alert>
      )}
    </div>
  );
}
