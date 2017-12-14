module.exports = {
    presets: [
        '@babel/preset-react',
        '@babel/preset-stage-2',
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        'last 2 Chrome versions'
                    ]
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
        ],
        '@babel/plugin-transform-react-jsx-source'
    ]
}
