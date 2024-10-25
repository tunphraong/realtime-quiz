export interface User {
  user_id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface Quiz {
  quiz_id: string;
  quiz_title: string;
  created_at: string;
}

export interface Question {
  question_id: string;
  quiz_id: string;
  question_text: string;
  correct_answer: string;
}

export interface Answer {
  answer_id: string;
  question_id: string;
  user_id: string;
  selected_answer: string;
  submitted_at: string;
}

export interface Score {
  score_id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  updated_at: string;
}

export interface LeaderboardEntry {
  leaderboard_id: string;
  quiz_id: string;
  user_id: string;
  rank: number;
  score: number;
}
