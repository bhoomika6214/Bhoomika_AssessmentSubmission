# Go Business Referral Dashboard

## Setup
1. `npm install`
2. `npm run dev`

## Notes
- Auth API response shape assumed as `{ token, user }` in `AuthContext.jsx` — adjust if real response differs.
- `getReferrals` assumes the API returns either a raw array or `{ referrals: [...] }` — check `useReferrals.js` and adjust the destructure once the real payload shape is confirmed.
- Overview Metrics / Service Summary use placeholder data in `DashboardPage.jsx` until dedicated endpoints exist.
