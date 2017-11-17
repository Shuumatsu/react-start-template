module.exports = {
    presets: [
        '@babel/preset-react',
        '@babel/preset-stage-2',
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        'ie > 10'
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
        [
            '@babel/plugin-transform-runtime',
            {
                helpers: false,
                polyfill: false,
                regenerator: true,
                moduleName: '@babel/runtime'
            }
        ]
    ]
}