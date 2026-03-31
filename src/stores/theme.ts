import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  toggle: () => void;
  init: () => void;
}

export const useThemeStore = create<ThemeState>()((set, get) => ({
  mode: 'dark',

  toggle: () => {
    const next = get().mode === 'light' ? 'dark' : 'light';
    set({ mode: next });
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('jubilee-theme', next);
  },

  init: () => {
    const stored = localStorage.getItem('jubilee-theme') as ThemeMode | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    // Dark is the default — only go light if explicitly stored or system prefers light
    const mode = stored ?? (prefersLight ? 'light' : 'dark');
    set({ mode });
    document.documentElement.classList.toggle('dark', mode === 'dark');
  },
}));
