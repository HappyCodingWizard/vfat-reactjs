import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core";
import { merge } from "lodash";

// custom colors

const primaryLightDay = "#61738E";
const primaryLightNight = "#61738E";

const primaryMainDay = "#0D2146";
const primaryMainNight = "#0D2146";

const primaryDarkDay = "#341f10";
const primaryDarkNight = "#341f10";

const secondaryMainDay = "#e7b89d";
const secondaryMainNight = "#e7b89d";

const secondaryLightDay =
  "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)";
const secondaryLightNight = "#131B59";

const secondaryDarkDay = "#A5A5A5";
const secondaryDarkNight = "rgba(24, 33, 100, 0.5)";

const infoMainDay = "#1E2735";
const infoMainNight = "#1E2735";

const infoDarkDay =
  "linear-gradient(180deg, #A5A5A5 0%, #A5A5A5 54.17%, #A5A5A5 99.99%)";
const infoDarkNight =
  "linear-gradient(180deg, #73D6F1 0%, #5F72FF 99.99%, #2F3DA0 100%)";

const SuccessMainDay = '#1BC870';
const SuccessMainNight = '#1BC870';

const ErrorMainDay = '#C81B72';
const ErrorMainNight = '#C81B72';

const WarningMainDay = '#FDC113';
const WarningMainNight = '#FDC113';

  const backgroundDay = "#F1F6FF";
  const backgroundNight = "#F1F6FF";

const backgroundPaperDay =
  "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)";
const backgroundPaperNight =
  "linear-gradient(180deg, #131B59 0%, #2F3DA0 100%)";

const textPrimaryDay = '#101722';
const textPrimaryNight = '#101722';

const textSecondaryDay = "#636060";
const textSecondaryNight = "#FFFFFF";

const textHintDay = "#636060";
const textHintNight = "#73D6F1";

const black = "#131B59";
const white = "#ffffff";

// colors
const primary = "#235DF4";
const premiaBlueDay = "rgba(82, 148, 255, 0.12)";
const premiaBlueNight = "rgba(82, 148, 255, 0.2)";

const greySecondaryDay = "#F4F4F4";
const greySecondaryNight = "#646464";

const whiteColor = "#F7FAFF";

const callGradientA = "#5294FF";
const callGradientB = "#1EFF78";

const putGradientA = "#EB4A97";
const putGradientB = "#8C43F6";

const dividerGreyDay = "#E9E9E9";
const dividerGreyNight = "#212121";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 700;
const xs = 0;

// spacing
const spacing = 8;

function createTheme(
  custom: any,
  options?: ThemeOptions | undefined,
  ...args: object[]
) {
  return createMuiTheme(merge(custom, options), ...args);
}

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "light",
      action: {
        disabledBackground: "",
        disabled: "set color of text here",
      },
      primary: {
        light: primaryLightDay,
        main: primaryMainDay,
        dark: primaryDarkDay,
      },
      secondary: {
        light: secondaryLightDay,
        main: secondaryMainDay,
        dark: secondaryDarkDay,
      },
      info: {
        main: infoMainDay,
        dark: infoDarkDay,
      },
      common: {
        black,
        white,
      },
      warning: {
        main: WarningMainDay,
      },
      text: {
        primary: textPrimaryDay,
        secondary: textSecondaryDay,
        hint: textHintDay,
      },
      background: {
        default: backgroundDay,
        paper: backgroundPaperDay,
      },
      success: {
        main: SuccessMainDay,
      },
      error: {
        main: ErrorMainDay,
      },
      divider: dividerGreyDay,
    },
    typography: {
      htmlFontSize: 16,
      fontSize: 14,
    },
    breakpoints: {
      values: {
        xl,
        lg,
        md,
        sm,
        xs,
      },
    },
    overrides: {
      MuiButton: {
        root: {
          boxSizing: "border-box",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "18px",
          borderRadius: 12,
          textTransform: "none",
          padding: "6px 2.25rem",
          backgroundColor: primary,
          color: white,
          margin: "2px",
        },
        label: {
          "& svg:not(:first-child)": {
            marginLeft: 6,
          },
        },
        startIcon: {
          marginLeft: 0,
        },
        text: {
          width: 90,
        },
        textPrimary: {
          backgroundColor: primary,
          color: white,
          border: `1px solid transparent`,

          "&:hover": {
            borderColor: primary,
            color: primary,
            "& svg path": {
              fill: primary,
            },
          },

          "&:active": {
            borderColor: primary,
            color: primary,
            "& svg path": {
              fill: primary,
            },
          },
        },
        textSecondary: {
          background: premiaBlueNight,
          color: primary,
        },
        sizeSmall: {
          height: "35px",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "18px",
        },
        sizeLarge: {
          height: "45px",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "18px",
        },
        contained: {
          backgroundColor: "transparent",
          color: greySecondaryDay,
          boxShadow: "none",
          "& svg path": {},
        },
        outlined: {
          backgroundColor: "transparent",
          color: greySecondaryDay,
        },
        containedPrimary: {
          background: `linear-gradient(121.21deg, ${callGradientA} 7.78%, ${callGradientB} 118.78%);`,
          color: white,
          "&:hover": {
            background: `linear-gradient(121.21deg, ${callGradientB} 7.78%, ${callGradientA} 118.78%);`,
          },
          "&$disabled": {
            opacity: "0.3",
            color: white,
          },
          "&:active": {
            backgroundColor: primary,
            color: white,
            background: "none",
            opacity: "1",
          },
        },
        containedSecondary: {
          background: `linear-gradient(316.57deg, ${putGradientA} 18.89%, ${putGradientB} 95.84%);`,
          color: white,
          "&:hover": {
            background: `linear-gradient(316.57deg, ${putGradientB} 18.89%, ${putGradientA} 95.84%);`,
          },
          "&:active": {
            backgroundColor: putGradientB,
            color: white,
            background: "none",
            opacity: "1",
          },
        },
        outlinedPrimary: {
          backgroundColor: premiaBlueDay,
          color: primary,
          border: "none",
          "&:hover": {
            backgroundColor: primary,
            color: white,
            border: "none",
          },
          "&:active": {
            color: white,
            backgroundColor: primary,
            opacity: 1,

            "& .MuiButton-label > svg path": {
              fill: white,
            },
          },
        },
        outlinedSecondary: {
          backgroundColor: white,
          color: textSecondaryDay,
          border: `1px solid ${dividerGreyDay}`,
          "&:hover": {
            backgroundColor: white,
            color: greySecondaryNight,
            border: `1px solid ${greySecondaryDay}`,
          },
          "&:active": {
            color: textSecondaryDay,
            border: `1px solid ${greySecondaryDay}`,
          },
        },
      },
      
      MuiTableCell: {
        root: {
          borderBottom: "1px solid #E5E5E5",
        },
      },
      MuiContainer: {
        fixed: {
          borderRadius: 12,
          background: white,
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.0746353)",
          padding: 0,
        },
      },
      MuiFilledInput: {
        root: {
          borderRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        underline: {
          "&::after": {
            borderBottom: "none",
          },
          "&::before": {
            borderBottom: "none",
          },
          "&:hover::before": {
            borderBottom: "none",
          },
        },
        input: {
          padding: 12,
        },
      },
      MuiPaper: {
        elevation1: {
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.0746353)",
        },
        root: {
          "&:focus": {
            outline: "none",
          },
        },
        rounded: {
          borderRadius: 12,
          border: `1px solid ${dividerGreyDay}`,
        },
      },
      MuiPopover: {
        paper: {
          overflowX: "unset",
          overflowY: "unset",
          transform: "translateY(-11px) !important",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.0746353)",
        },
      },
      MuiIconButton: {
        root: {
          padding: 4,
        },
      },
      MuiOutlinedInput: {
        root: {
          border: `1px solid ${dividerGreyDay}`,
          background: "white",
          borderRadius: 12,
          height: 45,

          "& .MuiSelect-root": {
            paddingLeft: 12,
            alignItems: "center",
            display: "flex",
            zIndex: 100,

            "& svg": {
              width: 20,
              marginRight: 2,
              position: "relative",
              height: 20,
              top: -2,

              "& path": {
                fill: primary,
              },
            },

            "& span": {
              fontSize: 14,
            },

            "&:focus": {
              background: "transparent",
            },
          },
        },
        notchedOutline: {
          border: "none",
        },
        input: {
          padding: 4,
        },
      },
      MuiTabs: {
        scroller: {
          padding: "0 10px",
        },
        indicator: {
          background: primary,
          borderRadius: 1.25,
          boxShadow: "0px 0px 11px rgba(82, 148, 255, 0.0001)",
        },
      },
      MuiTab: {
        labelIcon: {
          minWidth: 98,
          minHeight: 55,
          paddingTop: 0,
          padding: 0,
          "&.Mui-selected": {
            color: primary,

            "& svg:first-child": {
              "& path": {
                fill: primary,
              },
            },
          },
        },
        wrapper: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",

          "& svg": {
            marginBottom: "0px !important",
            marginRight: 6,
          },
        },
      },
      MuiTableSortLabel: {
        root: {
          "& img": {
            width: 16,
            marginLeft: 4,
          },
        },
      },
      MuiBottomNavigation: {
        root: {
          background: "white",
          border: "none",
          borderRadius: 12,
          minWidth: 210,
          width: "fit-content",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.07)",
        },
      },
      MuiBottomNavigationAction: {
        root: {
          fontSize: 14,
          lineHeight: "18px",
          fontWeight: "normal",
          minWidth: "auto",
          borderRadius: 12,
          padding: "6px 20px 8px 9px",
          margin: 6,

          "& path": {
            fill: greySecondaryDay,
          },

          "& svg": {
            width: "20px",
            height: "18px",
            marginRight: 4,
          },

          "&$selected": {
            background: "rgba(82, 148, 255, 0.12)",
            borderRadius: 10,

            "& path": {
              fill: primary,
            },
          },
        },
        wrapper: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          "& img:first-child": {
            marginBottom: "0 !important",
            marginRight: 6,
            height: 24,
          },
          "& img:nth-child(2)": {
            position: "absolute",
            top: 8,
            right: 0,
          },
        },
        label: {
          fontSize: 14,
          lineHeight: "18px",

          "&$selected": {
            fontWeight: "bold",
          },
        },
      },
      MuiStepper: {
        root: {
          padding: 0,
          position: "relative",
          background: "transparent",
        },
        vertical: {},
        alternativeLabel: {
          display: "flex",
        },
      },
      MuiStepButton: {},
      MuiStepConnector: {
        vertical: {
          padding: 0,
          marginLeft: 15,

          "&.Mui-disabled": {
            "& span": {
              borderColor: dividerGreyDay,
            },
          },
        },
        lineVertical: {
          minHeight: 20,
          borderLeftWidth: 2,
        },
        active: {
          borderColor: "white",

          "&:before": {
            height: "50%",
            content: "''",
          },
        },
        line: {
          borderColor: "#5294FF",
        },
      },
      MuiStepContent: {
        root: {
          position: "absolute",
          width: "calc(100% - 205px)",
          right: 0,
          top: 0,
          marginTop: 0,
          marginLeft: 0,
          paddingLeft: 0,
          paddingRight: 0,
          borderLeft: "none",

          "& > div": {
            borderRadius: 12,
            border: "1px solid #E9E9E9",
            width: "100%",
            background: "white",
          },
        },
      },
      MuiStepIcon: {
        root: {},
      },
      MuiStepLabel: {
        label: {
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "24px",

          "&$completed": {
            color: "#646464",
          },
          "&$root": {
            color: "#646464",
          },
        },
        active: {
          background:
            "-webkit-linear-gradient(121.21deg, #1EFF78 -11.78%, #5294FF 118.78%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          width: "fit-content",
        },
      },
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "dark",
      primary: {
        light: primaryLightNight,
        main: primaryMainNight,
        dark: primaryDarkNight,
      },
      secondary: {
        light: secondaryLightNight,
        main: secondaryMainNight,
        dark: secondaryDarkNight,
      },
      info: {
        main: infoMainNight,
        dark: infoDarkNight,
      },
      common: {
        black,
        white,
      },
      warning: {
        main: WarningMainNight,
      },
      text: {
        primary: textPrimaryNight,
        secondary: textSecondaryNight,
        hint: textHintNight,
      },
      background: {
        default: backgroundNight,
        paper: backgroundPaperNight,
      },
      success: {
        main: SuccessMainNight,
      },
      error: {
        main: ErrorMainNight,
      },
      divider: dividerGreyNight,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
    typography: {
      htmlFontSize: 16,
      fontSize: 14,
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      subtitle1: {},
      subtitle2: {},
      body1: {},
      body2: {},
    },
    spacing,
    breakpoints: {
      values: {
        xl,
        lg,
        md,
        sm,
        xs,
      },
    },
    overrides: {
      MuiContainer: {
        fixed: {
          border: `1px solid ${dividerGreyNight}`,
          borderRadius: 12,
          padding: 0,
        },
      },
      MuiMenu: {
        paper: {
          borderRadius: 5,
          border: `1px solid ${primaryLightDay}`,
          background: '#DAE7F9'
        }
      },
      MuiInputBase: {
        root: {
          "&.Mui-focused > input::placeholder": {
            color: "transparent",
          },
        },
      },
      MuiInput: {
        underline: {
          "&::before": {
            borderColor: dividerGreyNight,
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: 4,
        },
      },
      MuiInputLabel: {
        root: {},
        shrink: {
          "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: "translate(12px, 10px) scale(0.75)",
          },
        },
        outlined: {
          "&.MuiInputLabel-outlined": {
            transform: "translate(8px, 20px) scale(1)",
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          border: `1px solid ${dividerGreyNight}`,
          background: "black",
          borderRadius: 12,
          height: 45,

          "& .MuiSelect-root": {
            alignItems: "center",
            display: "flex",
            paddingLeft: 12,
            zIndex: 100,

            "& svg": {
              width: 20,
              marginRight: 2,
              position: "relative",
              height: 20,
              top: -2,

              "& path": {
                fill: primary,
              },
            },

            "& span": {
              fontSize: 14,
            },

            "&:focus": {
              background: "transparent",
            },
          },
        },
        notchedOutline: {
          border: "none",
        },
        input: {
          padding: 4,
        },
      },
      MuiFilledInput: {
        root: {
          borderRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        underline: {
          "&::after": {
            borderBottom: "none",
          },
          "&::before": {
            borderBottom: "none",
          },
          "&:hover::before": {
            borderBottom: "none",
          },
        },
        input: {
          padding: 12,
        },
      },
      MuiSelect: {
        filled: {
          "&:focus": {},
        },
        iconFilled: {},
        select: {
          "&:focus": {},
        },
        icon: {},
        selectMenu: {},
      },
      MuiButtonGroup: {
        root: {},
        contained: {},
        groupedContainedHorizontal: {
          "&:not(:last-child)": {},
        },
        groupedHorizontal: {
          "&:not(:last-child) > div > div": {},
          "&:not(:first-child) > div > div": {},
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: "1px solid #E5E5E5",
        },
      },
      MuiTableSortLabel: {
        root: {
          "& img": {
            width: 16,
            marginLeft: 4,
          },
        },
      },
      MuiTabs: {
        scroller: {
          padding: "0 10px",
        },
        indicator: {
          background: whiteColor,
          borderRadius: 1.25,
          boxShadow:
            "0px 0px 2px rgba(82, 148, 255, 0.514578), 0px 0px 6px rgba(255, 255, 255, 0.538381), 0px 0px 11px #5294FF",
        },
      },
      MuiTab: {
        labelIcon: {
          minWidth: 98,
          minHeight: 55,
          paddingTop: 0,
          padding: 0,

          "&.Mui-selected": {
            color: primary,

            "& svg:first-child": {
              "& path": {
                fill: primary,
              },
            },
          },
        },
        wrapper: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",

          "& svg": {
            marginRight: 6,
            marginBottom: "0px !important;",
          },
        },
      },
      MuiFab: {
        extended: {
          "&.MuiFab-sizeSmall": {},
        },
        sizeSmall: {},
      },
      MuiButton: {
        root: {
          boxSizing: "border-box",
          fontWeight: 700,
          borderRadius: 12,
          textTransform: "none",
          padding: "6px 2.25rem",
          backgroundColor: primary,
          color: white,
          margin: "2px",
        },
        label: {
          "& svg:not(:first-child)": {
            marginLeft: 6,
          },
        },
        startIcon: {
          marginLeft: 0,
        },
        sizeSmall: {
          borderRadius: "10px",
          height: "35px",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "18px",
        },
        sizeLarge: {
          height: "45px",
        },
        text: {
          width: 90,
        },
        textPrimary: {
          backgroundColor: primary,
          color: white,
          border: `1px solid transparent`,

          "&:hover": {
            borderColor: primary,
            color: primary,
            "& svg path": {
              fill: primary,
            },
          },

          "&:active": {
            borderColor: primary,
            color: primary,
            "& svg path": {
              fill: primary,
            },
          },
        },
        textSecondary: {
          background: premiaBlueNight,
          color: primary,
          "&:hover": {
            "& svg path": {
              fill: textSecondaryNight,
            },
            color: textSecondaryNight,
          },
        },
        contained: {
          backgroundColor: "transparent",
          color: greySecondaryNight,
          "& svg path": {},
        },
        outlined: {
          backgroundColor: "transparent",
        },
        containedPrimary: {
          background: `linear-gradient(121.21deg, ${callGradientA} 7.78%, ${callGradientB} 118.78%);`,
          color: black,
          boxShadow: "0px 0px 25px rgba(43, 229, 154, 0.25)",
          "&:hover": {
            background: `linear-gradient(121.21deg, ${callGradientB} 7.78%, ${callGradientA} 118.78%);`,
          },
          "&$disabled": {
            opacity: "0.3",
            color: black,
          },
          "&:active": {
            backgroundColor: primary,
            color: black,
            background: "none",
            opacity: "1",
          },
        },
        containedSecondary: {
          background: `linear-gradient(316.57deg, ${putGradientA} 18.89%, ${putGradientB} 95.84%);`,
          color: black,
          fontWeight: 500,
          boxShadow: "0px 0px 5px rgba(246, 67, 207, 0.4)",
          "&:hover": {
            background: `linear-gradient(316.57deg, ${putGradientB} 18.89%, ${putGradientA} 95.84%);`,
          },
          "&:active": {
            backgroundColor: putGradientB,
            color: black,
            background: "none",
            opacity: "1",
          },
        },
        outlinedPrimary: {
          backgroundColor: premiaBlueNight,
          color: primary,
          border: "none",

          "&:hover": {
            color: black,
            border: "none",
            backgroundColor: primary,
          },

          "&:active": {
            color: white,
            backgroundColor: primary,
            opacity: 1,

            "& .MuiButton-label > svg path": {
              fill: white,
            },
          },
        },
        outlinedSecondary: {
          backgroundColor: black,
          color: greySecondaryNight,
          border: `1px solid ${dividerGreyNight}`,
          "&:hover": {
            color: white,
            border: `1px solid ${greySecondaryNight}`,
          },
          "&:active": {
            color: greySecondaryNight,
          },
        },
      },
      MuiPaper: {
        root: {
          "&:focus": {
            outline: "none",
          },
        },
        rounded: {
          borderRadius: 12,
          border: `1px solid ${dividerGreyNight}`,
        },
      },
      MuiPopover: {
        paper: {
          overflowX: "unset",
          overflowY: "unset",
          transform: "translateY(-11px) !important",
          boxShadow: "none",
          "&::before": {
            // content: '""',
            position: "absolute",
            marginRight: "-0.71em",
            bottom: 0,
            right: 40,
            width: 16,
            height: 16,
            background: black,
            border: `1px solid ${dividerGreyNight}`,
            // transform: "translate(-50%, 50%) rotate(135deg)",
            clipPath:
              "polygon(-8px -8px, calc(100% + 8px) -8px, calc(100% + 8px) calc(100% + 8px))",
          },
        },
      },
      MuiBottomNavigation: {
        root: {
          background: black,
          border: `1px solid ${dividerGreyNight}`,
          borderRadius: 12,
          width: "fit-content",
          minWidth: 210,
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.07)",
        },
      },
      MuiBottomNavigationAction: {
        root: {
          fontSize: 14,
          lineHeight: "18px",
          fontWeight: "normal",
          minWidth: "auto",
          borderRadius: 12,
          padding: "6px 12px 8px 9px",
          margin: 6,

          "& path": {
            fill: greySecondaryNight,
          },

          "& svg": {
            width: "20px",
            height: "18px",
            marginRight: 4,
          },

          "&$selected": {
            background: "rgba(82, 148, 255, 0.12)",
            borderRadius: 10,

            "& path": {
              fill: primary,
            },
          },
        },
        wrapper: {
          display: "flex",
          flexDirection: "row",
        },
        label: {
          fontSize: 14,
          lineHeight: "18px",

          "&$selected": {
            fontWeight: "bold",
          },
        },
      },
      MuiStepper: {
        root: {
          padding: 0,
          position: "relative",
          background: "transparent",
        },
        vertical: {},
        alternativeLabel: {
          display: "flex",
        },
      },
      MuiStepButton: {},
      MuiStepConnector: {
        vertical: {
          padding: 0,
          marginLeft: 15,

          "&.Mui-disabled": {
            "& span": {
              borderColor: "#212121",
            },
          },
        },
        lineVertical: {
          minHeight: 20,
          borderLeftWidth: 2,
        },
        active: {
          borderColor: "white",

          "&:before": {
            height: "50%",
            content: "''",
          },
        },
        line: {
          borderColor: "#5294FF",
        },
      },
      MuiStepContent: {
        root: {
          position: "absolute",
          width: "calc(100% - 205px)",
          right: 0,
          top: 0,
          marginTop: 0,
          marginLeft: 0,
          paddingLeft: 0,
          paddingRight: 0,
          borderLeft: "none",

          "& > div": {
            borderRadius: 12,
            border: "1px solid #212121",
            width: "100%",
          },
        },
      },
      MuiStepIcon: {
        root: {},
      },
      MuiStepLabel: {
        label: {
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "24px",

          "&$completed": {
            color: "#646464",
          },
          "&$root": {
            color: "#646464",
          },
        },
        active: {
          background:
            "-webkit-linear-gradient(121.21deg, #1EFF78 -11.78%, #5294FF 118.78%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          width: "fit-content",
        },
      },
    },
  })
);

const theme = { lightTheme, darkTheme };

export default theme;
