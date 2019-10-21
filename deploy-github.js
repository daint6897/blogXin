const ghpages = require('gh-pages')

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/daint6897/daint6897.github.io.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)