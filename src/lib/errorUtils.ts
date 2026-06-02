/**
 * Extract a human-readable message from an RTK Query error object.
 */
export function getErrorMessage(error: unknown): string | null {
  if (!error) return null;
  if (typeof error === "string") return error;
  if (typeof error !== "object") return null;

  const err = error as Record<string, unknown>;

  // RTK Query fetchBaseQuery error shape
  if (err.data && typeof err.data === "object") {
    const data = err.data as Record<string, unknown>;
    if (typeof data.message === "string") return data.message;
  }

  // Standard Error
  if (err.message && typeof err.message === "string") return err.message;

  // HTTP status
  if (err.status && typeof err.status === "number") {
    if (err.status === 401) return "Invalid API key. Check your .env file.";
    if (err.status === 404) return "City not found. Try a different name.";
    return `Request failed with status ${err.status}`;
  }

  return null;
}
