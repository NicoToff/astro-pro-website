import { useEffect } from "react";

export function useOnMount(fn: () => void) {
  if (typeof window === "undefined") return;

  useEffect(() => {
    fn();
  }, []);
}
