A node example (maybe package at some point) to receive image from client and return results from [DenseCap](https://github.com/jcjohnson/densecap) results.

# Installation

1. Install [Torch](http://torch.ch/docs/getting-started.html#_).
2. If you get the error `th: command not found`, then you need to add the following to `~/.bash_profile`.

```
nano ~/.bash_profile
```

Then add the following:

```
PATH=$PATH\:/Users/yourusername/torch/install/bin ; export PATH
```


2. Follow the [densecap installation instructions](https://github.com/jcjohnson/densecap#installation) to install dependencies.
3. Clone repo. Navigate terminal to the `node-densecap` directory.
4. Download the "pre-trained model" file (1GB!)
```
./download_pretrained_model.sh
```
5. Install Node packages
```
npm install
```
6. Run server
```
node server.js
```
7. Open browser to `localhost:3000`.
