This is a [Next.js 15](https://nextjs.org) project setup with [Supabase](https://supabase.com), [Simplewebauthn for Passkey](https://simplewebauthn.dev/), [Tailwind v4](https://tailwindcss.com/), [Shadcn](https://ui.shadcn.com/)

## Before you begin

You need install Docker Desktop in your system ([Windows](https://docs.docker.com/desktop/setup/install/windows-install/), [macOS](https://docs.docker.com/desktop/setup/install/mac-install/), or [Linux](https://docs.docker.com/desktop/setup/install/linux/)).

## Quickstart Supabase

Step 1
configure your email SMTP in `/project/supabase/config.toml`

```bash
[auth.email.smtp]
enabled = true
host = "sandbox.smtp.mailtrap.io"
port = 2525
user = ""
pass = ""
admin_email = "noreply@project.lt"
sender_name = "Project"
```

Step2
run supabase, if you run first time then you need to wait a few minutes to download images for Docker
`npx supabase start`

Step 3
rename file `.env.production` to `.env.local`

Step 4
after supabase succesfully run copy keys from terminal to `.env.local` file

```
ANON_KEY
SERVICE_ROLE_KEY
AUTH_JWT_SECRET
```

Open supabase studio
[http://localhost:54323](http://localhost:54323)

## Quickstart Nextjs

Step 1
run npm to download all dependencies:

```bash
npm run i
```

Step 2
run the development server:

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel
