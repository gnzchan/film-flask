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

const Themes = {
  light: {
    logo: "/images/ff-logo.svg",
    sidebar: {
      backgroundColor: "#ffffff",
    },
    menu: {
      hover: {
        backgroundColor: "#EBEBEB",
      },
    },
  },
  dark: {
    logo: "/images/ff-logo-inverted.svg",
    sidebar: {
      backgroundColor: "#0B0C10",
      color: "#8ba1b7",
    },
    menu: {
      hover: {
        backgroundColor: "#2A2A36",
      },
    },
  },
};

export const getColorTheme = (theme: string | undefined): ThemeProperties => {
  return theme === "dark" ? Themes.dark : Themes.light;
};
