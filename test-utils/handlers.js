import { rest } from 'msw';

const SUPABASE_URL = 'https://iznmkrlaxdgglvsrgdxw.supabase.co';

// Define handlers for the API endpoints you want to mock
export const handlers = [
    // Handler for fetching questions based on quiz ID
    rest.get(`${SUPABASE_URL}/rest/v1/questions`, (req, res, ctx) => {
        const quizId = req.url.searchParams.get('quiz_id');
        if (quizId === 'mockQuizId') {
            return res(
                ctx.status(200),
                ctx.json([
                    { question_id: '1', quiz_id: quizId, question_text: 'Kind and generous', correct_answer: 'Benevolent' },
                    { question_id: '2', quiz_id: quizId, question_text: 'What is the capital of France?', correct_answer: 'Paris' },
                ])
            );
        }
        return res(ctx.status(404), ctx.json({ message: 'Quiz not found' }));
    }),

    // Handler for submitting answers
    rest.post(`${SUPABASE_URL}/rest/v1/answers`, (req, res, ctx) => {
        const { question_id, user_id, selected_answer } = req.body;
        // Mock behavior when an answer is submitted
        if (question_id && user_id && selected_answer) {
            return res(ctx.status(201));
        }
        return res(ctx.status(400), ctx.json({ message: 'Invalid answer submission' }));
    }),

    // Handler for updating scores
    rest.patch(`${SUPABASE_URL}/rest/v1/scores`, (req, res, ctx) => {
        const { score_id, quiz_id, user_id } = req.body;
        if (score_id && quiz_id && user_id) {
            return res(
                ctx.status(200),
                ctx.json({
                    score_id,
                    quiz_id,
                    user_id,
                    score: req.body.score + 1, // Mock behavior to increase score
                })
            );
        }
        return res(ctx.status(400), ctx.json({ message: 'Score update failed' }));
    }),

    // Handler for retrieving user details
    rest.get(`${SUPABASE_URL}/rest/v1/users`, (req, res, ctx) => {
        const userId = req.url.searchParams.get('user_id');
        if (userId === 'mockUserId') {
            return res(
                ctx.status(200),
                ctx.json({
                    user_id: 'mockUserId',
                    username: 'testUser',
                    email: 'testUser@example.com',
                })
            );
        }
        return res(ctx.status(404), ctx.json({ message: 'User not found' }));
    }),

    // Handler for creating or fetching users
    rest.post(`${SUPABASE_URL}/rest/v1/users`, (req, res, ctx) => {
        const { username, email } = req.body;
        if (username && email) {
            return res(
                ctx.status(201),
                ctx.json({
                    user_id: 'newUserId',
                    username,
                    email,
                })
            );
        }
        return res(ctx.status(400), ctx.json({ message: 'Invalid user data' }));
    }),

    // Handler for fetching the leaderboard based on quiz ID
    rest.get(`${SUPABASE_URL}/rest/v1/leaderboard`, (req, res, ctx) => {
        const quizId = req.url.searchParams.get('quiz_id');
        if (quizId === 'mockQuizId') {
            return res(
                ctx.status(200),
                ctx.json([
                    { user_id: 'user1', username: 'User One', score: 5 },
                    { user_id: 'user2', username: 'User Two', score: 3 },
                    { user_id: 'user3', username: 'User Three', score: 2 },
                ])
            );
        }
        return res(ctx.status(404), ctx.json({ message: 'Leaderboard not found' }));
    }),
];


// test-utils/handlers.js
// import { rest } from 'msw';

// export const handlers = [
//     // Mock the fetch questions API call
//     rest.get('https://YOUR_SUPABASE_URL/rest/v1/questions', (req, res, ctx) => {
//         const quizId = req.url.searchParams.get('quiz_id');
//         if (quizId === 'mockQuizId') {
//             return res(
//                 ctx.status(200),
//                 ctx.json([
//                     { question_id: '1', quiz_id: 'mockQuizId', question_text: 'What is the capital of France?', correct_answer: 'Paris' },
//                     { question_id: '2', quiz_id: 'mockQuizId', question_text: 'What is 2 + 2?', correct_answer: '4' },
//                 ])
//             );
//         }
//         return res(ctx.status(404), ctx.json({ message: 'Quiz not found' }));
//     }),

//     // Mock the submit answer API call
//     rest.post('https://YOUR_SUPABASE_URL/rest/v1/answers', (req, res, ctx) => {
//         return res(ctx.status(201));
//     }),

//     // Mock the update score API call
//     rest.patch('https://YOUR_SUPABASE_URL/rest/v1/scores', (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json({ score: 1 }));
//     }),
// ];
