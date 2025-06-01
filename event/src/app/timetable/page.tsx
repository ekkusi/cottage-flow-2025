import { DecorativeElements } from "@/components/general/decorative-elements";
import { Card } from "@/components/ui/card";

export default function TimetablePage() {
  const schedule = {
    friday: [
      { time: "21:00", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
      { time: "24:00", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
    ],
    saturday: [
      { time: "14:00", artist: "MYSTEERI ARTISTI", venue: "Piha" },
      { time: "16:00", artist: "MYSTEERI ARTISTI", venue: "Olohuone" },
      { time: "21:30", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
      { time: "23:30", artist: "MYSTEERI ARTISTI", venue: "Päälava" },
    ],
  };

  return (
    <div className="relative min-h-[80vh] px-4 py-12">
      {/* Background decorative elements */}
      <DecorativeElements count={10} />

      {/* Main content */}
      <div className="mx-auto max-w-4xl">
        <h1>AIKATAULU</h1>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Friday Schedule */}
          <div className="space-y-6">
            <Card>
              <h2 className="mb-6 text-3xl font-bold text-wood-primary">
                PERJANTAI
              </h2>
              <div className="space-y-4">
                {schedule.friday.map((event, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-1 font-vt323"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl">{event.time}</span>
                      <span className="text-lg text-gray-600">
                        {`{${event.venue}}`}
                      </span>
                    </div>
                    <div className="text-xl font-bold">{event.artist}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Saturday Schedule */}
          <div className="space-y-6">
            <Card>
              <h2 className="mb-6 text-3xl font-bold text-wood-primary">
                LAUANTAI
              </h2>
              <div className="space-y-4">
                {schedule.saturday.map((event, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-1 font-vt323"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl">{event.time}</span>
                      <span className="text-lg text-gray-600">
                        {`{${event.venue}}`}
                      </span>
                    </div>
                    <div className="text-xl font-bold">{event.artist}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Legend */}
        <Card className="mt-8 rounded-none border-2 border-wood-primary bg-white/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-wood-primary">PAIKAT</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold">PÄÄLAVA</h3>
              <p className="text-gray-600">Päälava talossa</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">ULOHUONE</h3>
              <p className="text-gray-600">Talon sisällä olohuoneessa</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">PIHA</h3>
              <p className="text-gray-600">Ulkosalla jossakin</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

