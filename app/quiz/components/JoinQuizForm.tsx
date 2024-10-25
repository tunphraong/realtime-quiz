// app/quiz/components/JoinQuizForm.tsx
"use client";

import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import QuestionDisplay from "./QuestionDisplay";
import RealTimeScore from "./RealTimeScore";

export default function JoinQuizForm() {
  const [quizId, setQuizId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [scoreId, setScoreId] = useState<string | null>(null);
  const [hasJoined, setHasJoined] = useState<boolean>(false);

  const joinQuiz = async (): Promise<void> => {
    if (!quizId || !username) {
      alert("Please enter both quiz ID and username.");
      return;
    }
    

    // Check if the user exists or create a new user
    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (userError) {
      const { data: newUser, error: createUserError } = await supabase
        .from("users")
        .insert([{ username, email: `${username}@example.com` }])
        .select("*")
        .single();

      if (createUserError) {
        console.error(createUserError);
        return;
      }

      user = newUser;
    }

    setUserId(user.user_id);

    // Fetch or create the score entry for the user in this quiz
    const { data: scoreData, error: scoreError } = await supabase
      .from("scores")
      .select("*")
      .eq("quiz_id", quizId)
      .eq("user_id", user.user_id)
      .single();

    if (scoreError) {
      // If the score entry doesn't exist, create it
      const { data: newScore, error: createScoreError } = await supabase
        .from("scores")
        .insert([{ quiz_id: quizId, user_id: user.user_id, score: 0 }])
        .select("*")
        .single();

      if (createScoreError) {
        console.error(createScoreError);
        return;
      }

      setScoreId(newScore.score_id);
    } else {
      // If the score entry exists, reset the score to 0
      const { data: updatedScore, error: updateScoreError } = await supabase
        .from("scores")
        .update({ score: 0 })
        .eq("score_id", scoreData.score_id)
        .select("*")
        .single();
      if (updateScoreError) {
        console.error(updateScoreError);
        return;
      }

      setScoreId(updatedScore.score_id);
    }

    setHasJoined(true);
  };

  return (
    <>
      {!hasJoined ? (
        <>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Quiz ID"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={joinQuiz}
          >
            Join Quiz
          </button>
        </>
      ) : (
        <>
          {scoreId && userId && <RealTimeScore scoreId={scoreId} quizId={quizId} />}
          <QuestionDisplay quizId={quizId} userId={userId} />
        </>
      )}
    </>
  );
}
