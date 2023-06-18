import { PaletteMode } from "@mui/material";
import { grey, deepOrange } from "@mui/material/colors";
const colors = {
    primaryBlue: "#1B9BD7",
    backgroundColor: "#F2F4FF",
    success: "#25D366",
    danger: "#FF3E2C",
    pink: "#E76795",
}

export const getDesignTokens = (mode: PaletteMode): any => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                background: {
                    default: colors.backgroundColor,
                },
                primary: {
                    main: colors.primaryBlue
                },
                secondary: {
                    main: colors.backgroundColor
                },
                success: {
                    main: colors.success
                },
                danger: {
                    main: colors.danger
                },
                pink: {
                    main: colors.pink
                },
                blue: {
                    main: "#71C07B"
                },
                greenish: {
                    main: "#5099BE"
                },
                // divider: amber[200],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],
                background: {
                    default: deepOrange[900],
                    paper: deepOrange[900],
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "100px",
                    padding: "9px 36px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    fontSize: "16px",
                    background: "linear-gradient(90deg, rgba(27,155,215,1) 0%, rgba(26,135,187,1) 100%)",
                    color: "#fff",
                    fontWeight: 400,
                    textTransform: "capitalize",
                },

            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: "8px !important",
                    backgroundColor: "#fff"
                },
                input: {
                    padding: "14px !important",
                    fontSize: 16
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: "100% !important",
                },
            }
        }
    },
    typography: {
        defaultProps: {
            variantMapping: {
                h1: 'h2',
                h2: 'h2',
                h3: 'h2',
                h4: 'h2',
                h5: 'h2',
                h6: 'h2',
                subtitle1: 'span',
                body1: 'p',
                body2: 'strong',
            },
        },
        h2: {
            fontSize: 36,
            fontWeight: 500,
            color: colors.primaryBlue,
            marginBottom: "10px"
        },
        h3: {
            fontSize: 26,
            fontWeight: 400
        },
        h4: {
            fontSize: 22,
            fontWeight: 100
        },
        h5: {
            fontSize: 18,
            fontWeight: 100
        },
        h6: {
            fontSize: 16,
            fontWeight: 100
        },
        body1: {
            fontSize: 18,
            margin: 0,
            fontWeight: 100
        },

    },
});
