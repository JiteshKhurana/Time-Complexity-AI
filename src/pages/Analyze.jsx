"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Code, Clock, Zap } from "lucide-react";

export default function Analyze() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [inputSize, setInputSize] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const analyzeCode = async () => {
    // Simulating API call to AI service
    setAnalysis({
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(n)",
      explanation:
        "The nested loops in your code result in a quadratic time complexity. For each element in the outer loop, the inner loop iterates through all elements, leading to n * n operations.",
      tlePrediction:
        "Your code may exceed the time limit for input sizes larger than 10^5 elements.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-hidden">
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          TimeComplexity.AI
        </h1>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border-0 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Code Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <Textarea
                  placeholder="Paste your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[200px] bg-white/5 border-0 placeholder-gray-400 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border-0 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Input Constraints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="input-size" className="text-right text-white">
                    Input Size
                  </Label>
                  <Textarea
                    id="input-size"
                    value={inputSize}
                    onChange={(e) => setInputSize(e.target.value)}
                    placeholder="e.g., 10^5"
                    className="col-span-3 bg-white/5 border-0 placeholder-gray-400 text-white min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time-limit" className="text-right text-white">
                    Time Limit (s)
                  </Label>
                  <Input
                    id="time-limit"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    placeholder="e.g., 1"
                    className="col-span-3 bg-white/5 border-0 placeholder-gray-400 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-center mb-12">
          <Button
            size="lg"
            onClick={analyzeCode}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            Analyze Code
          </Button>
        </div>

        {analysis && (
          <section>
            <Card className="bg-white/10 backdrop-blur-lg border-0 rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <Clock className="h-8 w-8 text-pink-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Time Complexity
                      </h3>
                      <p className="text-gray-200">{analysis.timeComplexity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Code className="h-8 w-8 text-purple-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Space Complexity
                      </h3>
                      <p className="text-gray-200">
                        {analysis.spaceComplexity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      Explanation
                    </h3>
                    <p className="text-gray-200">{analysis.explanation}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Zap className="h-8 w-8 text-yellow-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        TLE Prediction
                      </h3>
                      <p className="text-gray-200">{analysis.tlePrediction}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}
