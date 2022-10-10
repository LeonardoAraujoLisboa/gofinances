module.exports = {
    preset: "react-native",
    testPathIgnorePatterns: [
        "/node_modules",
        "/android",
        "/ios",
    ],//configurando o que eu nao quero q ele teste
    setupFilesAfterEnv: [
        "@testing-library/jest-native/extend-expect",
        "jest-styled-components"
    ]
}
