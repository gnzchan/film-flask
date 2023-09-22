interface ThemeProperties {
  logo: string;
  sidebar: {
    backgroundColor: string;
  };
  menu: {
    hover: {
      backgroundColor: string;
    };
  };
}

export const Themes = {
  light: {
    logo: "/images/ff-logo.svg",
    sidebar: {
      backgroundColor: "#f5f5f5",
    },
    menu: {
      hover: {
        backgroundColor: "#e5e5e5",
      },
    },
  },
  dark: {
    logo: "/images/ff-logo-inverted.svg",
    sidebar: {
      backgroundColor: "#171717",
    },
    menu: {
      hover: {
        backgroundColor: "#404040",
      },
    },
  },
};

export const getColorTheme = (theme: string | undefined): ThemeProperties => {
  return theme === "dark" ? Themes.dark : Themes.light;
};
