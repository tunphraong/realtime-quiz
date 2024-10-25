// app/quiz/page.tsx
import JoinQuizForm from "./components/JoinQuizForm";

export default function QuizPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Join a Quiz</h1>
      <JoinQuizForm />
    </div>
  );
}
