import { useSpeechRecognition } from 'react-speech-kit';

type UseVoiceMultiTextReturn = [
  (options?: { lang?: string; interimResults?: boolean }) => void, // 음성 인식 시작 함수
  boolean, // 음성 인식 중인지 상태
  () => void, // 음성 인식 중지 함수
];

const useVoiceMultiText = (callback: (result: string) => void): UseVoiceMultiTextReturn => {
  // 음성 인식 관련
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      callback(result);
    },
  });
  // value, setValue, startListen, isListening, stopListen
  return [listen, listening, stop];
};

export default useVoiceMultiText;
