# eleventy (11ty) build action for deployment

This action allows for an easy integration into your deployment workflow for eleventy.
I recomment using a ```.eleventy.js```for configuration .

## using the action

There are four configuration options:

```yaml
node_version: 23  # default
working_directory: '.'
output: './_site'
quiet: false
```

You can either set or leave them. Best is, to configure 11ty via its JS.
The action just runs a ```npm ci``` to install your dependencies and then runs 11ty with the provided options in your current workdir. If you're using a different folder structure, adjust accordingly.

**example github action**
```yaml
# .github/workflows/build-and-deploy.yaml

name: 11ty build and deploy
on:
  push:
    branches:
      - 'main'

jobs:

  build_deploy:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && startsWith(github.ref, 'refs/heads/main')

    steps:

      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run eleventy build
        uses: maschmann/eleventy-build-action@v1
        with:
          node_version: 23  # default
          working_directory: './my-project' # default '.'
          output: './_site' # default
          quiet: true       # default false

      - name: Copy files to server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SERVER_NAME }}
          username: ${{ secrets.SERVER_DEPLOY_USER }}
          key: ${{ secrets.SERVER_DEPLOY_KEY }}
          rm: true
          source: "_site/"
          target: ${{ vars.DEPLOYMENT_TARGET }}
```