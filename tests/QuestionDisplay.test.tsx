/**
 * @jest-environment jsdom
 */
import React from 'react';
import { rest } from 'msw';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionDisplay from '../app/quiz/components/QuestionDisplay';
import '@testing-library/jest-dom';
import { server } from '../test-utils/server';

test('displays questions and submits answers', async () => {
  // Mock the Supabase API for fetching questions
  server.use(
    rest.get(
      "https://iznmkrlaxdgglvsrgdxw.supabase.co/rest/v1/questions",
      (req, res, ctx) => {
        const quizId = req.url.searchParams.get("quiz_id");
        
          return res(
            ctx.status(200),
            ctx.json([
              {
                question_id: "1",
                quiz_id: quizId,
                question_text: "Kind and generous",
                correct_answer: "Benevolent",
              },
              {
                question_id: "2",
                quiz_id: quizId,
                question_text: "What is the capital of France?",
                correct_answer: "Paris",
              },
            ])
          );
      }
    )
  );

  render(
    <QuestionDisplay
      quizId="mockQuizId"
      userId="mockUserId"
    />
  );

  // Wait for the first question to be fetched and displayed
  const questionText = await screen.findByText('Kind and generous');
  expect(questionText).toBeInTheDocument();

  // Enter the answer and submit
  fireEvent.change(screen.getByPlaceholderText('Your Answer'), {
    target: { value: 'Benevolent' },
  });
  fireEvent.click(screen.getByText('Submit Answer'));
});

test('handles no questions available', async () => {
  // Mock the Supabase API to return an empty array
  server.use(
    rest.get(
      "https://iznmkrlaxdgglvsrgdxw.supabase.co/rest/v1/questions",
      (req, res, ctx) => {
        const quizId = req.url.searchParams.get("quiz_id");
        if (quizId === "mockQuizId") {
          return res(ctx.status(200), ctx.json([]));
        } else {
          return res(ctx.status(404), ctx.json({ message: "Quiz not found" }));
        }
      }
    )
  );

  render(
    <QuestionDisplay
      quizId="mockQuizId"
      userId="mockUserId"
    />
  );

  // Verify that the message for no questions available is shown
  const noQuestionsMessage = await screen.findByText('No questions available for this quiz.');
  expect(noQuestionsMessage).toBeInTheDocument();
});

