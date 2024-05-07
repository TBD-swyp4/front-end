// react-speech-kit.d.ts
declare module 'react-speech-kit' {
  export function useSpeechSynthesis(options?: { onEnd?: () => void }): {
    speak: (text: string, options?: { voice?: SpeechSynthesisVoice }) => void;
    voices: SpeechSynthesisVoice[];
    speaking: boolean;
  };

  export function useSpeechRecognition(options?: {
    onResult?: (result: string) => void;
    onEnd?: () => void;
  }): {
    listen: (options?: { lang?: string; interimResults?: boolean }) => void;
    stop: () => void;
    listening: boolean;
  };
}
