import { mergeWith, concat } from 'ramda'
import common from './babel.common'

const presets = []

const plugins = []

export default mergeWith(concat, common, { presets, plugins })
