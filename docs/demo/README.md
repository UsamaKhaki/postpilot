# Demo video

`postpilot-demo.mp4` (65 seconds, 1280x800, no audio) was recorded from a local production build (`npm run build && npm start`) signed in with the demo account, so every screen shows seeded sample data. The captions were overlaid on the page during recording.

| Step | Scene |
|---|---|
| 1 | Landing page: what Postpilot does and the approval-first idea |
| 2 | Log in, then continue with the demo account |
| 3 | Dashboard overview: queue, next post awaiting approval, stats |
| 4 | Composer: type an idea, pick the Analytical tone, generate a draft (local template, no AI key) |
| 5 | Schedule the draft, which lands in the posts queue |
| 6 | Filter the queue by status, then approve the post awaiting approval |
| 7 | Settings: switch between the Playful and Professional themes |

When you approve a post, the app normally opens LinkedIn's share composer in a new tab. That tab was suppressed for the recording, so the video shows the post moving to Published instead.

## Running the same flow yourself

```bash
npm install
npm run dev
```

Open http://localhost:6401/login, choose **Or continue with a demo account**, and follow the scenes above. Restarting the server resets the demo data.
