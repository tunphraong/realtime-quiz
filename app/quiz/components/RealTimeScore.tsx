// app/quiz/components/RealTimeScore.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";

interface RealTimeScoreProps {
  scoreId: string;
  quizId: string;
}

export default function RealTimeScore({ scoreId, quizId }: RealTimeScoreProps) {
  const [userScore, setUserScore] = useState<number>(0);

  useEffect(() => {
    if (scoreId) {
      fetchUserScore();
      const unsubscribe = subscribeToScoreUpdates();
      return () => unsubscribe();
    }
  }, [scoreId]);

  const fetchUserScore = async (): Promise<void> => {
    const { data, error } = await supabase
      .from("scores")
      .select("score")
      .eq("score_id", scoreId)
      .single();

    if (error) {
      console.error("Error fetching score:", error);
    } else {
      console.log("get into updating score");
      setUserScore(data?.score || 0);
    }
  };

  const subscribeToScoreUpdates = () => {
    const subscription = supabase
      .channel(`realtime scores:quizId=${quizId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "scores",
          filter: `score_id=eq.${scoreId}`,
        },
        (payload) => {
          console.log("payload", payload);
          setUserScore(payload.new.score);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  return (
    <div className="bg-gray-100 p-2 rounded mb-4">
      <h2 className="text-lg font-semibold">Your Score: {userScore}</h2>
    </div>
  );
}
