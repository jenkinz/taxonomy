# Taxonomy

An open source application built using the new router, server components and everything new in Next.js 13.

> **Warning**
> This app is a work in progress. I'm building this in public. You can follow the progress on Twitter [@shadcn](https://twitter.com/shadcn).
> See the roadmap below.

## About this project

This project as an experiment to see how a modern app (with features like authentication, subscriptions, API routes, static pages for docs ...etc) would work in Next.js 13 and server components.

**This is not a starter template.**

A few people have asked me to turn this into a starter. I think we could do that once the new features are out of beta.

## Note on Performance

> **Warning**
> This app is using the unstable releases for Next.js 13 and React 18. The new router and app dir is still in beta and not production-ready.
> **Expect some performance hits when testing the dashboard**.
> If you see something broken, you can ping me [@shadcn](https://twitter.com/shadcn).

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Route handlers
- Metadata files
- Server and Client Components
- API Routes and Middlewares
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- UI Components built using **Radix UI**
- Documentation and blog using **MDX** and **Contentlayer**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Add MDX support for basic pages~
- [x] ~Build marketing pages~
- [x] ~Subscriptions using Stripe~
- [x] ~Responsive styles~
- [x] ~Add OG image for blog using @vercel/og~
- [x] Dark mode

## Known Issues

A list of things not working right now:

1. ~GitHub authentication (use email)~
2. ~[Prisma: Error: ENOENT: no such file or directory, open '/var/task/.next/server/chunks/schema.prisma'](https://github.com/prisma/prisma/issues/16117)~
3. ~[Next.js 13: Client side navigation does not update head](https://github.com/vercel/next.js/issues/42414)~
4. [Cannot use opengraph-image.tsx inside catch-all routes](https://github.com/vercel/next.js/issues/48162)

## Why not tRPC, Turborepo or X?

I might add this later. For now, I want to see how far we can get using Next.js only.

If you have some suggestions, feel free to create an issue.

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env` and update the variables.

    ```sh
    cp .env.example .env
    ```

    - `NEXTAUTH_SECRET`: generate with `openssl rand -base64 32`
    - `DATABASE_URL`:
      - Create a new database called `taxonomy` on [PlanetScale](https://planetscale.com/)
      - In PlanetScale, go to **Branches** and create a new branch called `dev`
      - Click the `dev` branch, then click the **Connect** button
      - Change the **Connect with** dropdown to **Prisma**, copy the `DATABASE_URL` string and add it to `.env` (replacing any existing `DATABASE_URL environment variable already in there)
      - (Optional) Back on PlanetScale > Branches, click the `main` branch and click **Promote to production branch**
      - From the project command line, run the following to push the database schema to the PlanetScale `dev` branch:

        ```sh
        npx prisma db push
        ```

      - Going forward, after making changes to the schema in `prisma.schema`, run `npx prisma db push` which will (1) run `prisma generate` to re-sync the Prisma Client and (2) push the changes to the `dev` branch on PlanetScale (see [this article](https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale#how-to-make-schema-changes-with-db-push) for explanation)
    - Postmark env vars:
      - Create an account at [postmarkapp.com](https://postmarkapp.com). Then create two templates:
        - Activation Template

          ```
          Hello,

          Please click this link to activate your {{ product_name }} account:

          {{ action_url }}

          The {{ product_name }} Team
          ```

        - Sign In Template

          ```
          Hello,

          Please click this link sign in to {{ product_name }}:

          {{ action_url }}

          Regards,

          The {{ product_name }} Team
          ```

        - Copy the numeric ID numbers for each template and set the `POSTMARK_SIGN_IN_TEMPLATE` and `POSTMARK_ACTIVATION_TEMPLATE` env vars in `.env` accordingly
        - `POSTMARK_API_TOKEN`: Go to the **API Tokens** section in your Postmark account and copy from there
        - `SMTP_FROM`: Set to the email address where you'd like emails to be sent from
        - Don't forget to update DKIM DNS settings for your domain to allow Postmark to send from, if applicable (visit the **Sender Signatures** section in your Postmark account to configure)

3. Start the development server:

```sh
pnpm dev
```

## License

Licensed under the [MIT license](https://github.com/shadcn/taxonomy/blob/main/LICENSE.md).
