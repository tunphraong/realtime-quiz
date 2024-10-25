"use client";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Quiz, Question } from "../../types/database";

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [questions, setQuestions] = useState<
    { text: string; answer: string }[]
  >([]);

  const createQuiz = async (): Promise<void> => {
    const { data, error: quizError } = await supabase
      .from("quizzes")
      .insert([{ quiz_title: quizTitle }])
      .select("*");

    if (quizError) {
      console.error(quizError);
      return;
    }

    // const quiz = data as Quiz;
    // console.log(quiz)

    // const quizId = quiz?.quiz_id ?? "";

    // Add questions
    for (const question of questions) {
      console.log("get here", question);
      const { error: questionError } = await supabase.from("questions").insert([
        {
          quiz_id: data.quiz_id,
          question_text: question.text,
          correct_answer: question.answer,
        },
      ]);
      //   console.log(quiz.quiz_id, question.text, question.answer);
      if (questionError) {
        console.error(questionError);
      }
    }

    alert("Quiz created successfully!");
  };

  const addQuestion = (): void => {
    setQuestions([...questions, { text: questionText, answer: correctAnswer }]);
    setQuestionText("");
    setCorrectAnswer("");
  };

  return (
    <div>
      <h1>Create a Quiz</h1>
      <input
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <h2>Add Questions</h2>
      <input
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <input
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <button onClick={addQuestion}>Add Question</button>

      <h3>Questions</h3>
      <ul>
        {questions.map((q, i) => (
          <li key={i}>
            {q.text} - {q.answer}
          </li>
        ))}
      </ul>

      <button onClick={createQuiz}>Create Quiz</button>
    </div>
  );
}
