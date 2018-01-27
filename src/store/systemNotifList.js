var notifList = {
    /** For Viewer notifications **/
    "viewerWelcome": {
        type: "info",
        header: "Hello! ", 
        message: "This is the expected output for your story. For any changes, you have to go back to the Writer by clicking the Close button. If you're satisfied with your work, press Export to HTML at the end of the Preview pane."
    },
    "avatarNotExist": {
        type: "warning",
        header: "Caution!", 
        message: "<avatar name> is not on your avatar database. Edit your character list if it's not intended. Otherwise, we'll using the default format."
    },
    
    /** For developers only **/
    // Notify typo on notif
    "emptyNotif": {
        type: "danger",
        header: "DevError!",
        message: "Your SystemNotif codename doesn't exist! Please check for misspellings and rerun the code."
    }
} 

export default function showNotif(notif) {
    return notifList[notif] === undefined ? notifList["emptyNotif"] : notifList[notif];
}