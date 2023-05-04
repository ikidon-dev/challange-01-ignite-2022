# Challange 01 - Ignite 2022 (NodeJS)

This is the first challenge of Rocketseat's Ignite NodeJS 2022 trail and also one of the main challenges for completing the trail.

<br />

## Challenges I had

Some of the challenges I had were understanding how Jest worked to be able to understand why it returned a specific error, the error that hit my head the most was this one:

```bash
Timeout - Async callback was not invoked within the 400 ms timeout specified by jest.setTimeout.Timeout - Async callback was not invoked within the 400 ms timeout specified by jest.setTimeout.Error:
```

At first, it even seemed simple to me, I thought lol. I started debugging, and I increased Jest's Timeout but it didn't work, I tried to run one test at a time but it didn't work, I gave that second thought because my notebook is not the best at the moment so I thought it was crashing a lot and buggy when running the tests but that wasn't it, after a while looking at the documentation and everything, I looked at the code and saw that it was just the middleware that I hadn't implemented, consequently it broke the route.

Note: Drink water and then look at the code itself, then go get documentation or other solutions.

<br />

## Start Project

Clone that GitHub repository on your machine with the following command:

```bash
git clone https://github.com/ikidon-dev/challange-01-ignite-2022.git
```

> It is recommended that you clone using an SSH key connected to your GitHub account.

Once cloned, just enter the project and download the dependencies using Yarn with the following commands

```bash
cd challange-01-ignite-2022.git && yarn
```

Finally, you can start the project and test it using Postman or Insomnia with the following command:

```bash
yarn dev
```

Or if you want, you can just run Jest and see the result of the automated tests with the following command:

```bash
yarn test
```
