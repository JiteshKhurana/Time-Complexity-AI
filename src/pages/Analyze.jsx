import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Code, Clock, Zap } from "lucide-react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { ColorRing } from "react-loader-spinner";

export default function Analyze() {
  const [code, setCode] = useState("");
  const [constraints, setConstraints] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const analyzeCode = async (code, constraints, timeLimit) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-large-128k-online",
        messages: [
          {
            role: "system",
            content:
              'give final result in the following json format.Just give json format only and no other thing and TLE prediction should be strictly according to the given constraints and time limit.format is {   "timeComplexity": "O(n^2)",   "spaceComplexity": "O(n)",   "explanation": "The nested loops in the code lead to a quadratic time complexity. For each iteration of the outer loop, the inner loop iterates over all elements, resulting in n * n operations.",   "tlePrediction": {     "willTLE": "Yes",     "reason": "Given the constraints and a time limit of 1 second, the code performs O(n^2) operations. For n = 10^5, this results in 10^10 operations, which exceeds the 10^8 operations that can be performed in 1 second."   } }',
          },
          {
            role: "user",
            content: `Code: ${code}\nConstraints: ${constraints}\nTime limit: ${timeLimit}`,
          },
        ],
      }),
    };

    try {
      SetIsLoading(true);
      const response = await fetch(
        "https://api.perplexity.ai/chat/completions",
        options
      );
      const data = await response.json();
      console.log(data.choices[0].message.content);
      const analysisContent = data.choices[0].message.content
        .replace(/```json\n|```/g, "")
        .trim();
      const parsedAnalysis = JSON.parse(analysisContent);
      setAnalysis(parsedAnalysis);
      SetIsLoading(false);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false); // Hide confetti after 3 seconds
      }, 6000);
    } catch (error) {
      console.error("Error:", error);
      setAnalysis(null);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white flex flex-col items-center justify-center">
        <h1 className="text-6xl">Doing AI magic✨ for you</h1>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }
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
                    Constraints
                  </Label>
                  <Textarea
                    id="input-size"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
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
            onClick={() => analyzeCode(code, constraints, timeLimit)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            Analyze Code
          </Button>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none">
              <Confetti width={width} height={height} />
            </div>
          )}
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
                      <p className="text-gray-200">
                        {analysis?.timeComplexity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Code className="h-8 w-8 text-purple-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Space Complexity
                      </h3>
                      <p className="text-gray-200">
                        {analysis?.spaceComplexity}
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
                    <Zap className="h-16 w-16 text-yellow-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        TLE - {analysis?.tlePrediction?.willTLE}
                      </h3>
                      <p className="text-gray-200">
                        {analysis?.tlePrediction?.reason}
                      </p>
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
