import type { StorybookConfig } from '@storybook/react-webpack5'
import fs from 'fs'

function getStories({ dir = 'components' }) {
 const dirName = `packages/${dir}`
 const scope = fs.readdirSync(dirName)
 return scope
  .map((pkg) => `${dirName}/${pkg}/stories`)
  .filter((storyDir) => fs.existsSync(storyDir))
  .map((storyDir) => `../${storyDir}/*.stories.(ts|tsx)`)
}

const config: StorybookConfig = {
 stories: [...getStories({ dir: 'components' })],
 addons: [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
 ],
 framework: {
  name: '@storybook/react-webpack5',
  options: {},
 },
 babel: async (options) => {
  options.presets = [...(options.presets || []), '@babel/preset-typescript']

  return options
 },
 docs: {
  autodocs: 'tag',
 },
}
export default config
