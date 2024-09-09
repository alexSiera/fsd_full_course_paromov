import { UiButton } from "@/shared/ui/ui-button";
import { useToggleBlocking } from "../model/use-toggle-blocking";

export function ToggleBlockingButton({}) {
  const { isBlockingEnabled, isLoading, toggleBlocking, isReady } =
    useToggleBlocking();

  if (!isReady) {
    return null;
  }

  const text = isBlockingEnabled ? "Disable Blocking" : "Enable Blocking";
  const variant = isBlockingEnabled ? "primary" : "secondary";

  return (
    <UiButton disabled={isLoading} variant={variant} onClick={toggleBlocking}>
      {text}
    </UiButton>
  );
}
