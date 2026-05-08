import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MS_PER_HOUR = 3_600_000
export const MS_PER_DAY = 86_400_000

export function toErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

/**
 * Convert a Blob to a data URL. Preferred over URL.createObjectURL in
 * Tauri's macOS WKWebView where blob URLs can become invalid
 * (WebKitBlobResource error 1).
 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error ?? new Error("FileReader failed"))
    reader.readAsDataURL(blob)
  })
}
