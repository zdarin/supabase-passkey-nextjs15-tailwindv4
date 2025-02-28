## Project

This is a Next.js 15 project setup with Supabase, Simplewebauthn for Passkey, Tailwind v4, Shadcn

https://github.com/user-attachments/assets/90708b4c-53f9-46f7-989a-7cb2e2e0cce7

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

for testing emails you can use [Mailtrap](https://mailtrap.io/)

Step2
<br>
run supabase, if you run first time then you need to wait a few minutes to download images for Docker

```bash
npx supabase start
```

Step 3
<br>
rename file `development.env` to `.env.local`

Step 4
<br>
after supabase succesfully run copy keys from terminal to `.env.local` file

```
ANON_KEY
SERVICE_ROLE_KEY
AUTH_JWT_SECRET
```

Supabase studio link [http://localhost:54323](http://localhost:54323)

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

Project link [http://localhost:3000/auth/sign-up](http://localhost:3000/auth/sign-up)

## Project photos

<img width="1436" alt="Screenshot 2025-02-28 at 14 58 58" src="https://github.com/user-attachments/assets/443d0960-ab74-4ffb-8fdd-2be5740fa6f7" />
<img width="1436" alt="Screenshot 2025-02-28 at 13 43 46" src="https://github.com/user-attachments/assets/e100a238-6808-4d59-b547-c97c9576243c" />
<img width="1436" alt="Screenshot 2025-02-28 at 13 44 49" src="https://github.com/user-attachments/assets/9fc1ef6b-48fd-4fcd-a990-ba3f44fca361" />
<img width="1436" alt="Screenshot 2025-02-28 at 13 45 07" src="https://github.com/user-attachments/assets/90eb7d66-e815-458f-a34a-a3363ce6ab76" />
<img width="1436" alt="Screenshot 2025-02-28 at 13 45 21" src="https://github.com/user-attachments/assets/929b62c8-fb7f-4393-a8b8-fe7ba9af4c9c" />
<img width="1436" alt="Screenshot 2025-02-28 at 13 46 03" src="https://github.com/user-attachments/assets/5b1b9f8b-d428-4a8d-b3e7-c1c817f02039" />
<img width="1436" alt="Screenshot 2025-02-28 at 13 47 46" src="https://github.com/user-attachments/assets/bea4c3de-9228-48df-b1be-16a5bbdf93bc" />
<img width="1436" alt="Screenshot 2025-02-28 at 13 47 38" src="https://github.com/user-attachments/assets/96aceb1e-bcc9-4b90-88cf-115404863aec" />

## Special thanks for

<div>
    <a href="https://github.com/oouazize">
        <img src="https://avatars.githubusercontent.com/u/93908021?v=4" style="border-radius: 50%; width: 100px; height: 100px;"/>
        Oussama Ouazize
    </a>
    <br>
    integrated simplewebauthn (passkey) with supabase
</div>

<br>
<div>
    <a href="https://github.com/zdarin">
        <img src="https://avatars.githubusercontent.com/u/42121280?v=4" style="border-radius: 50%; width: 100px; height: 100px;"/>
        DarjusZ
    </a>
    <br>
    ieduced code to learn basic integrations of simplewebauthn (passkey) with supabase
</div>

<br>
<div>

- Based on Blog
  [Adding passkeys to a Supabase app without using third parties](https://jcmosc.com/blog/adding-passkeys-to-a-supabase-app)

</div>

## Learn more

To learn more, take a look at the following resources:

- [Next.js](https://nextjs.org/) - learn about Next.js features and API.
- [Supabase](https://supabase.com) - Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.
- [Simplewebauthn](https://simplewebauthn.dev/) - A collection of TypeScript-first libraries for simpler WebAuthn integration.
- [Tailwind](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
- [Shadcn](https://ui.shadcn.com/) - A set of beautifully-designed, accessible components and a code distribution platform.
