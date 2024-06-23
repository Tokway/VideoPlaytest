# LearnWell Video Player

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Application specifications are from [10Fold Showcase 1](https://app.10foldhiring.com/showcase/1).

## Overview

The LearnWell Video Player is a web application designed to allow users to create, comment on, and watch educational
videos. It provides a seamless and engaging experience with intuitive UI and robust functionality.

## Features

- **Video Listing**: Browse a list of educational videos.
- **Video Creation**: Create new video objects with a title, description, and video URL.
- **Comments**: Add and view comments on videos.
- **Full Screen Playback**: Enjoy videos in full screen with full playback functionality.
- **Playback Controls**: Adjust playback speed and volume for a tailored viewing experience.

## Getting Started

First, run the development server:

```
npm run dev

or
yarn dev

or
pnpm dev

or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## API Integration

This application consumes the following API: https://take-home-assessment-423502.uc.r.appspot.com/docs#/

- **User ID**: Use your first and last name in snake case as your `user_id` for creating video objects (e.g., John
  Smith: john_smith).
- **Comments**: Use any fake `user_id` for making comments.
- **Video URLs**: Upload example video URLs for testing.

## Deploying

1. Create a new Vercel project
2. Select this repository
3. Deploy Vercel project

## Further Improvements

- CORS support on the server
- Improve state management
- Make search functional
- Responsive design
- Add automated tests
- Add auth
- Edit video functionality
- Expose video description
- Improve type usage



## Contact

For questions or feedback, reach out to [support@LearnWell.com](mailto:support@learnwell.com).

Happy coding!
