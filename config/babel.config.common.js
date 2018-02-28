const presets = [
    [
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            spec: true,
            shippedProposals: true,
            targets: {
                browsers: ['chrome >= 55']
            }
        }
    ],
    '@babel/preset-react'
]

const plugins = [
    '@babel/plugin-proposal-decorators',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-pipeline-operator',
    '@babel/plugin-proposal-throw-expressions'
]

export default { presets, plugins }
