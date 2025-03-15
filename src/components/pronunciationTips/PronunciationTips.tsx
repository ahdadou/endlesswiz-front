import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const PronounciationTips = () => {
  return (
    <div className="order-4">
      <Card className="border-forest-100 shadow-sm bg-forest-50">
        <CardHeader>
          <CardTitle className="text-forest">Pronunciation Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-forest rounded-full p-1 text-white mt-0.5">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-sm">
              Listen carefully to native speakers and try to mimic their
              pronunciation.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-forest rounded-full p-1 text-white mt-0.5">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-sm">
              Practice speaking slowly at first, then gradually increase your
              speed.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-forest rounded-full p-1 text-white mt-0.5">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-sm">
              Record yourself speaking and compare it to the original audio.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-forest rounded-full p-1 text-white mt-0.5">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-sm">
              Focus on the rhythm and intonation of the language, not just
              individual sounds.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PronounciationTips;
