import { cache } from "react";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { PostCreateButton } from "@/components/post-create-button";
import { PostItem } from "@/components/post-item";
import { DashboardShell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "My Contributions",
};

const getContributionsForUser = cache(
  async (email: string | null | undefined) => {
    let contributions = [];

    if (email) {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization:
            "Basic " +
            Buffer.from(
              process.env.EA_APP_NAME + ":" + process.env.EA_API_KEY
            ).toString("base64"),
        },
        body: JSON.stringify({
          emails: [{ email: email }],
        }),
      };

      await fetch("https://api.securevan.com/v4/people/find", options)
        .then(async (response) => {
          const eaPerson = await response.json();
          if (response.ok && eaPerson) {
            console.log(`${email} vanId is ${eaPerson.vanId}`);
            // contributions.push(...);
          }
        })
        .catch((err) => console.error(err));
    }

    return contributions;
  }
);

export default async function ContributionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const contributions = await getContributionsForUser(user.email);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Contributions"
        text="View GFC contribution history"
      >
        <PostCreateButton />
      </DashboardHeader>
      <div>
        {contributions?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {contributions.map((contribution) => (
              // <PostItem key={contribution.id} post={contribution} />
              <>Contribution placeholder...</>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="billing" />
            <EmptyPlaceholder.Title>No contributions</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any contributions yet.
            </EmptyPlaceholder.Description>
            {/* <PostCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            /> */}
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
