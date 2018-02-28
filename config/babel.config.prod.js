import { mergeWith, concat } from 'ramda'
import common from './babel.common'

const presets = []

const plugins = [
    '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-transform-react-constant-elements',
    'babel-plugin-lodash',
    'babel-plugin-ramda'
]

export default mergeWith(concat, common, { presets, plugins })
