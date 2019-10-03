module.exports = (isDev) => {
    return {
        preserveWhiteSpace: true,
        extract: !isDev
    };
};
