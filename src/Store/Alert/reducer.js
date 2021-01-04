import { Switch } from "@material-ui/core"

const initalState = {
    alertMessage: '',
    type: null,
    displayAlert: false
}

export const alertData = (state = initalState, action) => {
    switch (action.type) {
        case 'SHOW_ALERT_MSG':
            return {
                displayAlert: true,
                alertMessage: action.payload.message,
                type: action.payload.type
            }
        case 'CLOSE_ALERT_MSG':
        default:
            return initalState
    }
}