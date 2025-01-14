import { Theme } from "@/entities/Theme";

import { themeRepositry } from "@/repositories/ThemeRepository";

type ThemeService = {
  getTheme: (id: string, accessToken?: string) => Promise<Theme>;
  getMyThemes: (accessToken?: string) => Promise<Theme[]>;
  getBestThemes: (accessToken?: string) => Promise<Theme[]>;
  getFriendsThemes: (accessToken?: string) => Promise<Theme[]>;
};

export const themeService: ThemeService = {
  getTheme: async (id: string, accessToken?: string) => {
    return await themeRepositry.getTheme({ id, accessToken });
  },
  getMyThemes: async (accessToken?: string) => {
    return (await themeRepositry.getMyThemes({ accessToken })).filter(
      (theme) => theme.isCustom
    );
  },
  getBestThemes: async (accessToken?: string) => {
    return await themeRepositry.getBestThemes({ accessToken });
  },
  getFriendsThemes: async (accessToken?: string) => {
    return await themeRepositry.getFriendsThemes({ accessToken });
  },
};
