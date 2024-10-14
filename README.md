# PureText

![Screenshot (729)](https://github.com/user-attachments/assets/87db553d-57f1-4e9a-995e-cb756c8d9d11)

## Introduction

PureText is a text analysis tool designed to help developers detect whether a given sentence contains any offensive word or not. This tool can be easily integrated into various applications to ensure safer communication and create a more respectful online environment. Using real-time evaluations powered by Upstash's vector database, PureText quickly identifies potentially toxic or offensive content, providing immediate feedback to users.

## Features of the Application

- **Real-time text analysis**: Detects whether a submitted sentence cotnains any offensive word or not.
- **Easy integration**: Developers can seamlessly add PureText to their applications for text analysis.
- **Safe communication**: Helps ensure respectful language usage across platforms.
- **User-friendly interface**: Simple and intuitive design for smooth user experience.

## Technologies Used

- **Backend**: Hono.js
- **Frontend**: Next.js, TailwindCSS, and daisyUI
- **Database**: Upstash vector database
- **Deployment**: Cloudflare Workers + Wrangler for deploying the Hono.js API and Vercel for deploying the NextJS application 
- **JavaScript Runtime**: Bun

## Deployment

Live Preview: https://pure-text-som.vercel.app/

HonoJS API: https://puretextsom.somenathchoudhury80.workers.dev/
