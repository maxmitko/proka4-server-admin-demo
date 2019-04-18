import typography from './typography'
import produce from "immer"

export const theme = {
    palette: {
        primary: "hsla(0, 0%, 0%, 1)",
        secondary: "hsla(187, 100%, 42%, 1)",
        background: "hsla(0, 0%, 93%, 1)",
        surface: "hsla(0, 0%, 100%, 1)",
        error: "hsla(0, 100%, 42%, 1)",
    },
    paletteOn: {
        primary: "hsla(0, 0%, 100%, 1)",
        secondary: "hsla(0, 0%, 100%, 1)",
        background: "hsla(0, 0%, 0%, 1)",
        surface: "hsla(210, 9%, 31%, 1)",
        error: "hsla(0, 0%, 100%, 1)",
    },
    extra: {
        default: null,
        gray: "hsla(0, 0%, 76%, 1)",
        primary: "hsla(291, 64%, 42%, 1)",
        danger: "hsla(4, 90%, 58%, 1)",
        success: "hsla(123, 36%, 52%, 1)",
        warning: "hsla(34, 98%, 51%, 1)",
        info: "hsla(187, 100%, 42%, 1)",
        rose: "hsla(340, 82%, 58%, 1)",
        white: "hsla(0, 0%, 100%, 1)",
    },
    extraOn: {
        default: null,
        gray: "hsla(0, 0%, 100%, 1)",
        primary: "hsla(0, 0%, 100%, 1)",
        danger: "hsla(0, 0%, 100%, 1)",
        success: "hsla(0, 0%, 100%, 1)",
        warning: "hsla(0, 0%, 100%, 1)",
        info: "hsla(0, 0%, 100%, 1)",
        rose: "hsla(0, 0%, 100%, 1)",
        white: "hsla(0, 0%, 0%, 1)",
    },
    extraLight: {
        default: null,
        gray: "hsla(0, 0%, 72%, 1)",
        primary: "hsla(291, 88%, 57%, 1)",
        danger: "hsla(22, 100%, 53%, 1)",
        success: "hsla(123, 45%, 57%, 1)",
        warning: "hsla(34, 98%, 60%, 1)",
        info: "hsla(187, 95%, 46%, 1)",
        rose: "hsla(340, 82%, 65%, 1)",
        white: "hsl(0, 100%, 100%)",
    },
    extraShadow: {
        default: null,
        gray: "hsla(0, 0%, 30%, 0.22)",
        primary: "hsla(291, 64%, 54%, 0.25)",
        danger: "hsla(0, 100%, 58%, 0.25)",
        success: "hsla(123, 45%, 57%, 0.25)",
        warning: "hsla(34, 98%, 60%, 0.25)",
        info: "hsla(187, 95%, 46%, 0.25)",
        rose: "hsla(340, 82%, 63%, 0.25)",
        white: "hsla(0, 0%, 30%, 0.25)",
    },
    typography: typography,
    zIndex: {
        mobileStepper: 1000,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    }
}

const newTheme = produce(theme, draftTheme => {
    draftTheme.extra.default = theme.extra.primary
    draftTheme.extraOn.default = theme.extraOn.primary
    draftTheme.extraLight.default = theme.extraLight.primary
    draftTheme.extraShadow.default = theme.extraShadow.primary
})


export default newTheme