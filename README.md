## Project

This is a Next.js 15 project setup with Supabase, Simplewebauthn for Passkey, Tailwind v4, Shadcn

## Before you begin

You need install Docker Desktop in your system ([Windows](https://docs.docker.com/desktop/setup/install/windows-install/), [macOS](https://docs.docker.com/desktop/setup/install/mac-install/), or [Linux](https://docs.docker.com/desktop/setup/install/linux/)).

## Quickstart Supabase

Step 1
<br>
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

for testing email you can use [Mailtrap](https://mailtrap.io/)

Step2
<br>
run supabase, if you run first time then you need to wait a few minutes to download images for Docker

```bash
npx supabase start
```

Step 3
<br>
rename file `.env.production` to `.env.local`

Step 4
<br>
after supabase succesfully run copy keys from terminal to `.env.local` file

```
ANON_KEY
SERVICE_ROLE_KEY
AUTH_JWT_SECRET
```

Open supabase studio [http://localhost:54323](http://localhost:54323)

## Quickstart Nextjs

Step 1
<br>
run npm to download all dependencies:

```bash
npm run i
```

Step 2
<br>
run the development server:

```bash
npm run dev
```

Open project [http://localhost:3000/auth/sign-up](http://localhost:3000/auth/sign-up)

## Special thanks for

<a href="https://github.com/oouazize">
    <img src="https://avatars.githubusercontent.com/u/93908021?v=4" width="64"/>
    Oussama Ouazize
</a>
<br>
integrate simplewebauthn (passkey) with supabase

<a href="https://github.com/zdarin">
    <img src="https://avatars.githubusercontent.com/u/42121280?v=4" width="64"/>
    DarjusZ
</a>
<br>
reduce code to learn basic integrations of simplewebauthn (passkey) with supabase

## Learn more

To learn more, take a look at the following resources:

- [Next.js](https://nextjs.org/) - learn about Next.js features and API.
- [Supabase](https://supabase.com) - Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.
- [Simplewebauthn](https://simplewebauthn.dev/) - A collection of TypeScript-first libraries for simpler WebAuthn integration.
- [Tailwind](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
- [Shadcn](https://ui.shadcn.com/) - A set of beautifully-designed, accessible components and a code distribution platform.
