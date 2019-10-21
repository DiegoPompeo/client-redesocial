const PROXY_CONFIG = [
    {
        context: [
            "/login",
            "/profile",
            "/register",
            "",
            "/register-success",
            "/update",
            "/details",
            "/cientists",
            "/premium"
        ],
        target: "https://server-redesocial.herokuapp.com/redesocial/",
        secure: false,
        "changeOrigin": true
    }
]

module.exports = PROXY_CONFIG;