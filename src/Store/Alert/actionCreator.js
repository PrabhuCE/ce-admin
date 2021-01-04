export const showAlertMsg = (payLoad) => dispatch => {
    dispatch({ type: 'SHOW_ALERT_MSG', payload: payLoad })
}
export const closeAlertMsg = () => dispatch => {
    dispatch({ type: 'CLOSE_ALERT_MSG', payload: {} })
}