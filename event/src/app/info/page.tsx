import { MapPin, Calendar, Music, Tent, Smile, Euro } from "lucide-react";
import { DecorativeElements } from "@/components/general/decorative-elements";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function InfoPage() {
  return (
    <div className="relative min-h-[80vh] px-4 py-12">
      {/* Background decorative elements */}
      <DecorativeElements count={8} />

      {/* Main content */}
      <div className="mx-auto max-w-4xl">
        <h1>INFO</h1>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* When & Where section */}
          <Card className="space-y-6">
            <h2 className="font-bold text-wood-primary">MILLOIN & MISSÄ</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-wood-primary" />
                <p className="text-xl">18.-20.7.2025</p>
              </div>

              <div className="flex items-start gap-3">
                <Euro className="h-6 w-6 text-wood-primary mt-[2px]" />
                <div className="max-w-[80%]">
                  <p className="text-xl">10€ (tai 5e vaan yks päivä)</p>
                  <p className="text-lg text-gray-600">
                    Vähän tarvitaan almuja tilan vuokran maksamiseks,
                    pahottelut...
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-wood-primary mt-[2px]" />
                <div>
                  <p className="text-xl">LÄNSI-TEISKON SEURATALO</p>
                  <p className="text-lg text-gray-600">
                    Piuharintie 615
                    <br />
                    34180 Länsi-Teisko
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* What to Expect section */}
          <Card className="space-y-6">
            <h2 className="font-bold text-wood-primary">MITÄ ODOTTAA</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Music className="h-6 w-6 text-wood-primary" />
                <p className="text-xl">LIVEMUSIIKKIA & ESITYKSIÄ</p>
              </div>

              <div className="flex items-center gap-3">
                <Tent className="h-6 w-6 text-wood-primary" />
                <p className="text-xl">RETKEILYMEININKIÄ</p>
              </div>
              {/* HAVING FUN*/}
              <div className="flex items-center gap-3">
                <Smile className="h-6 w-6 text-wood-primary" />
                <p className="text-xl">HAUSKANPITOA..!</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Getting There section */}
        <Card className="mt-8 space-y-6">
          <h2 className="font-bold text-wood-primary">SAAPUMINEN</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold">AUTOLLA</h3>
              <p className="text-gray-600">
                Tampereelta lyhkänen matka. Parkkipaikkaa reilusti tien
                varressa.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold">JULKISILLA</h3>
              <p className="text-gray-600">
                Bussilla pääsee Tampereelta. Semmonen tunti pari menee.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold">KYYDIT</h3>
              <p className="text-gray-600">
                Oletko tulossa autolla ja kyydissäsi on tilaa? Oletko kyytiä
                vailla? Ilmianna itsesi tai etsi kyytiä Kyydit-sivulta:
              </p>
              <div className="flex flex-col items-center mt-4">
                <Link href="/car-rides" className={buttonVariants()}>
                  KYYDIT
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Notes section */}
        <Card className="mt-8 space-y-4">
          <h2 className="font-bold text-wood-primary">HUOMIOITAVAA</h2>

          <ul className="list-inside list-disc space-y-2 text-lg text-gray-600">
            <li>
              Telttailuvarusteet mukaan - sisämajoitusta saatavilla hyvin
              rajoitetusti. Jos telttailu ei ole optio, niin laittele viestiä
              järjestäjille.
            </li>
            <li>
              Yhteisiä ruokia yritetään järjestellä 1 kpl per päivä. Muuten omat
              ruoat ja juomat mukaan. Talossa on ihan hyvä keittiö, mutta se ei
              joka tapauksessa riitä kaikkien kokkailuihin. Jos siis Trangia
              löytyy, niin otahan mukaan. Jääkaappitilaa myöskin hyvin
              rajoitetusti.
            </li>
            <li>Suihkua ei ole, järvi lähellä on.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
