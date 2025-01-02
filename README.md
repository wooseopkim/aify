# aify

This dead simple library lets humans mock machines that mock humans. Forget about the bundle size, it's freaking AI tech.

### Demo

You can chat with this fake AI [here](https://wooseopkim.github.io/aify/demo).

### API

1. `createStream`

```js
import { createStream } from 'aify';

const config = { delay: 1000, interval: 200 };
const reader = createStream('Hello, world!', config).getReader();
while (true) {
    const { done, value } = await reader.read();
    if (done) {
        break;
    }
    console.log(value);
}
```

2. `createGenerator`

This is a wrapper over `createStream`.

```js
import { createGenerator } from 'aify';

for await (const chunk of createGenerator('Hello, world!')) {
    console.log(chunk);
}
```
