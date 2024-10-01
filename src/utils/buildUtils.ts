import { BuildStateSchema, BuildState } from '@/utils/buildStateSchema';
import { z } from 'zod';

export function encodeBuildState(state: BuildState): string {
  try {
    BuildStateSchema.parse(state);
    const json = JSON.stringify(state);
    const utf8Bytes = new TextEncoder().encode(json);
    return btoa(String.fromCharCode.apply(null, Array.from(utf8Bytes)));
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Build state validation failed:', error.errors);
      throw new Error('Failed to encode build: Invalid build state');
    }
    throw error;
  }
}

export function decodeBuildState(encoded: string): BuildState {
  const binaryString = atob(encoded);
  const utf8Bytes = new Uint8Array(binaryString.split('').map((char) => char.charCodeAt(0)));
  const json = new TextDecoder().decode(utf8Bytes);
  const decodedState = JSON.parse(json);

  return BuildStateSchema.parse(decodedState);
}

export function safeDecodeBuildState(encoded: string): { state: BuildState | null; error: string | null } {
  try {
    const binaryString = atob(encoded);
    const utf8Bytes = new Uint8Array(binaryString.split('').map((char) => char.charCodeAt(0)));
    const json = new TextDecoder().decode(utf8Bytes);
    const decodedState = JSON.parse(json);

    const validatedState = BuildStateSchema.parse(decodedState);
    return { state: validatedState, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { state: null, error: `Invalid build data: ${error.errors[0].message}` };
    } else if (error instanceof SyntaxError) {
      return { state: null, error: 'Invalid JSON in share code' };
    } else {
      return { state: null, error: 'Failed to decode share code' };
    }
  }
}
