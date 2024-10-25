// app/quiz/components/QuestionDisplay.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Question, Answer } from "@/types/database";

interface QuestionDisplayProps {
  quizId: string;
  userId: string | null;
}

export default function QuestionDisplay({
  quizId,
  userId,
}: QuestionDisplayProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  const fetchQuestions = async (): Promise<void> => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", quizId);

    if (error) {
      console.error(error);
    } else {
      setQuestions(data);
    }
  };

  const submitAnswer = async (): Promise<void> => {
    const question = questions[currentQuestion];

    if (!question || !userId) return;

    const { error } = await supabase.from("answers").insert([
      {
        question_id: question.question_id,
        user_id: userId,
        selected_answer: answer,
      },
    ]);

    if (error) {
      console.error(error);
    } else {

      // Check if the answer is correct
      if (
        answer.trim().toLowerCase() ===
        question.correct_answer.trim().toLowerCase()
      ) {
        // If the answer is correct, update the user's score
        const { error: scoreError } = await supabase.rpc("increment_score", {
          p_quiz_id: quizId,
          p_user_id: userId,
        });

        if (scoreError) {
          console.error("Error updating score:", scoreError);
        }
      }
      setAnswer("");
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {questions[currentQuestion].question_text}
          </h2>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Your Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={submitAnswer}
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div>
          {questions.length === 0 ? (
            <p className="text-lg font-medium">
              No questions available for this quiz.
            </p>
          ) : (
            <p className="text-lg font-medium">
              Quiz completed! Thank you for participating.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
