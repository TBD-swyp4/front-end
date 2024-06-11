import type { DemoStoreType } from './demoTypes';

export const setDemoUserSetting = (
  set: (fn: (state: DemoStoreType) => void) => void,
  budget: number,
) => {
  set((state) => {
    state.userSettings.budget = budget;
  });
};
