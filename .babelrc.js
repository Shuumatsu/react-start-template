module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['last 2 Chrome versions']
                },
                spec: true
            }
        ],
        ['@babel/preset-stage-0', { decoratorsLegacy: true }],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-pipeline-operator',
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-proposal-do-expressions'
    ]
}
