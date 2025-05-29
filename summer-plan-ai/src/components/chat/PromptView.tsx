import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface PromptViewProps {
  onSubmit: (prompt: string) => void;
}

export function PromptView({ onSubmit }: PromptViewProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt") as string;
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] max-w-3xl mx-auto">
      <Card className="w-full p-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-3xl font-bold text-center mb-6">
          Suunnittele elämäsi paras kesä!
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Kerro millaisia asioita toivot kesällesi ja etsin täydellisen
          kesäsuunnitelman juuri sinulle!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            name="prompt"
            placeholder="Toivoisin kesältäni paljon rentoilua ja hieman hauskuttelua..."
            className="min-h-[120px] text-lg p-4 resize-none"
            autoFocus
          />
          <Button type="submit" className="w-full">
            Etsi kesän paras suunnitelma
            <Sparkles className="h-4 w-4 ml-0" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
