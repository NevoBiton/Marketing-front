export async function showSnackbar(message, type) {
    setSnackbar({ message, type, visible: true });
}