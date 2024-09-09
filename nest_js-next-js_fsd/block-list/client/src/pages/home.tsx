import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiSelectField } from "@/shared/ui/ui-select-field";
import { UiLink } from "@/shared/ui/ui-link";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiHeader } from "@/shared/ui/ui-header";
import { SignOutButton } from "@/features/auth";
import { useSessionQuery } from "@/entities/session";

export function HomePage() {
  const { data } = useSessionQuery();

  return (
    <main className={`min-h-screen `}>
      <UiHeader
        right={
          <div>
            {data?.email}
            <SignOutButton />
          </div>
        }
      />
      <br />
      <UiButton variant="primary">primary</UiButton>
      <br />
      <UiButton variant="secondary">secondary</UiButton>
      <br />
      <UiButton variant="outlined" disabled>
        outlined
      </UiButton>
      <UiTextField
        label="Text field"
        inputProps={{ placeholder: "Enter email" }}
      />
      <UiTextField
        error="Text field"
        inputProps={{ placeholder: "Enter email" }}
      />
      <UiTextField inputProps={{ placeholder: "Enter email" }} />
      <UiSelectField options={[{ value: "1", label: "option 1" }]} />
      <UiLink href="/">Hello world</UiLink>
      <UiSpinner className="text-teal-600 w-20 h-20" />
    </main>
  );
}
