const encodeEmail = (email) => {
    return encodeURIComponent(btoa(email));
};

const decodeEmail = (encodedEmail) => {
    try {
        return atob(decodeURIComponent(encodedEmail));
    } catch (error) {
        console.log("Error decoding email:", error);
        return null;
    }
};

export { encodeEmail, decodeEmail };
