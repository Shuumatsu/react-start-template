module.exports = {
    presets: [
        '@babel/preset-react',
        '@babel/preset-stage-2',
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['last 4 Chrome versions']
                },
                spec: true,
                modules: false
            }
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-decorators',
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ]
    ]
}
