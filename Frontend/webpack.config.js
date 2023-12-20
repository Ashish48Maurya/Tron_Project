resolve: {
    fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "http": require.resolve("stream-http"),
        "fs": false
    }
}
