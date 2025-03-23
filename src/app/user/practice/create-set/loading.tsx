import { Loader2 } from "lucide-react";

export default function UpgradeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
        <p className="text-white text-lg">Loading payment options...</p>
      </div>
    </div>
  );
}
