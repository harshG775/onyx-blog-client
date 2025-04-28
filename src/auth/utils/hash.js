const encode = (object) => {
    return encodeURIComponent(btoa(JSON.stringify(object)));
};

const decode = (string) => {
    try {
        return JSON.parse(atob(decodeURIComponent(string)));
    } catch (error) {
        console.log("Error decoding object:", error);
        return null;
    }
};

export { encode, decode };