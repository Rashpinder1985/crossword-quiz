import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const questions = [
  {
    q: "Which word is most likely to contribute the most to the clue for \"ORBIT\"?",
    options: ["Planets", "Revolve", "Around", "Sun"],
    answer: 0,
  },
  {
    q: "If attention scores are [0.9, 0.72, 0.18, 0.54, 0.81], what is the softmax weight \u03b1_1?",
    options: ["0.30", "0.25", "0.20", "0.18"],
    answer: 0,
  },
  {
    q: "What is the final context vector value A?",
    options: ["0.77", "0.84", "0.68", "0.92"],
    answer: 1,
  },
  {
    q: "What role does the attention mechanism play in this crossword generator?",
    options: [
      "It corrects spelling in generated clues.",
      "It chooses the correct crossword grid layout.",
      "It highlights relevant context words to generate accurate clues.",
      "It selects words from a dictionary at random."
    ],
    answer: 2,
  },
];

export default function CrosswordAttentionQuiz() {
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));

  const submitQuiz = () => {
    let s = 0;
    selected.forEach((ans, i) => {
      if (ans === questions[i].answer) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Crossword Generator with Attention in RNNs</h1>
      <p className="mb-6 text-lg">
        In this case study, we're using an RNN-based attention mechanism to generate crossword clues. Given a theme like "space", and a target word like "ORBIT", the model uses attention to identify which words from the context (e.g., "planets revolve around the sun") are most relevant for generating a clue.
        Each word in the sentence is encoded with a hidden state, and the attention mechanism computes scores to weigh them accordingly.
      </p>

      <div className="mb-6">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Attention-mechanism-01.svg/640px-Attention-mechanism-01.svg.png"
          alt="Attention Mechanism Diagram"
          width={640}
          height={360}
          className="rounded-xl shadow-md"
        />
        <p className="text-sm text-center mt-2 text-gray-600">
          Illustration of an Attention Mechanism in a sequence-to-sequence model.
        </p>
      </div>

      {questions.map((q, i) => (
        <Card key={i} className="mb-4">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-2">
              Q{i + 1}. {q.q}
            </h2>
            <div className="space-y-2">
              {q.options.map((opt, j) => (
                <div key={j}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`q${i}`}
                      disabled={submitted}
                      checked={selected[i] === j}
                      onChange={() => {
                        const newSelected = [...selected];
                        newSelected[i] = j;
                        setSelected(newSelected);
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {!submitted ? (
        <Button onClick={submitQuiz} className="mt-4">Submit Quiz</Button>
      ) : (
        <div className="mt-4 text-xl font-medium">
          Your Score: {score} / {questions.length}
        </div>
      )}
    </div>
  );
}
