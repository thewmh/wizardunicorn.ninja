module.exports = {
    // These are the files that Purgecss will search through
    content: ["./_site/**/*.html"],
    blocklist: ["./_site/js30"],

    // These are the stylesheets that will be subjected to the purge
    css: ["./_site/assets/css/*.css"],
    safelist: {
        standard: ['la-croix-can']
    },
    
    // We make it the files here
    output: ["./_site/assets/css"]
};