"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { PromptView } from "./PromptView";
import Image from "next/image";
import { RefreshCw, PenLine, ArrowRight } from "lucide-react";
import responses from "@/data/responses.json";
import LoadingIndicator from "./LoadingIndicator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const EVENT_APP_PROD_URL =
  process.env.NEXT_PUBLIC_EVENT_APP_URL ??
  "https://cottage-flow-2025.vercel.app";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [hasPrompted, setHasPrompted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (isTyping && messages.length > 0) {
      const response = messages[messages.length - 1].content;
      let currentIndex = 0;
      let lastPauseIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= response.length) {
          // Add random stuttering effect
          if (currentIndex - lastPauseIndex > 50 && Math.random() < 0.1) {
            // 10% chance to pause after every 50 characters
            lastPauseIndex = currentIndex;
            return; // Skip this interval to create a pause
          }

          setDisplayedText(response.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 10);

      return () => clearInterval(typingInterval);
    }
  }, [isTyping, messages]);

  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * responses.responses.length);
    return responses.responses[randomIndex].content;
  };

  const generateResponse = async (userMessage: Message) => {
    setIsThinking(true);
    setMessages([userMessage]);

    // Simulate AI thinking time, pick randomly 3-6s
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 3000 + 3000),
    );

    const assistantMessage: Message = {
      role: "assistant",
      content: getRandomResponse(),
    };

    setIsThinking(false);
    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(true);
  };

  const handlePromptSubmit = async (prompt: string) => {
    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setHasPrompted(true);
    generateResponse(userMessage);
  };

  const handleNewResponse = () => {
    setDisplayedText("");
    generateResponse(messages[0]);
  };

  const handleChangePrompt = () => {
    setHasPrompted(false);
    setMessages([]);
    setDisplayedText("");
  };

  if (!hasPrompted) {
    return <PromptView onSubmit={handlePromptSubmit} />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl mx-auto">
      <Card className="flex-1 overflow-y-auto p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="space-y-6">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-6 py-3 max-w-[85%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-4"
                    : "bg-muted mr-4"
                }`}
              >
                {message.role === "assistant" ? (
                  <>
                    <div className="whitespace-pre-line">
                      {isTyping ? displayedText : message.content}
                    </div>
                    {!isTyping && (
                      <>
                        <div className="mt-6 max-w-[450px] overflow-hidden animate-fade-in-up">
                          <Card className="cursor-pointer hover:opacity-90 transition-opacity pt-0 pb-2">
                            <div
                              className="relative w-full"
                              style={{
                                paddingBottom: `${(676 / 1385) * 100}%`, // Make image aspect ratio static
                              }}
                            >
                              <Image
                                src="/images/cottage-flow.jpg"
                                alt="Cottage Flow"
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div className="p-4 bg-card">
                              <h3 className="font-semibold mb-1">
                                Cottage Flow - Teisko Drift
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Kesän toisiksi paras viikonloppu!
                              </p>
                              <Link
                                className={cn(
                                  buttonVariants(),
                                  "gap-2 group transition-all items-center",
                                )}
                                href={
                                  process.env.NODE_ENV === "development"
                                    ? "http://localhost:3001"
                                    : EVENT_APP_PROD_URL
                                }
                              >
                                Katso tapahtuma
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </div>
                          </Card>
                        </div>

                        <div className="flex justify-start flex-wrap gap-3 mt-6 opacity-0 animate-fade-in-up animation-delay-500">
                          <Button
                            onClick={handleNewResponse}
                            variant="outline"
                            className="gap-2 group transition-all hover:bg-primary hover:text-primary-foreground"
                          >
                            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            Yritä uudestaan
                          </Button>
                          <Button
                            onClick={handleChangePrompt}
                            variant="outline"
                            className="gap-2 group transition-all hover:bg-primary hover:text-primary-foreground"
                          >
                            <PenLine className="h-4 w-4 transition-transform group-hover:scale-120" />
                            Muuta toiveita
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-6 py-3 mr-4">
                <LoadingIndicator />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
