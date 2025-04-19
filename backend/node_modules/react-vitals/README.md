**English** | [中文](./README.zh.md)

# React Vitals

React components, hooks and utilities to improve [Web Vitals](https://web.dev/articles/vitals) scores (FCP, LCP, CLS, INP)

## AfterClick

Currently, LCP stops counting elements after user interaction. So you can render ads, or popups after page clicked by user to avoid increasing LCP.

AfterClick component delay content rendering after page clicked.

```jsx
import { AfterClick } from 'react-vitals';

<div>
  <p>Click anywhere on page to render the following image:</p>
  <AfterClick>
    <img
      src="https://s.cn.bing.net/th?id=OHR.ZaharaDeLaSierra_EN-CN1476470896_1920x1080.webp&qlt=50"
      width={160}
      height={90}
    />
  </AfterClick>
</div>;
```

## Slice

LCP means Largest Content Painting. LCP element is usually a picture or text block.

Slice cuts a single big block into many small blocks and combines them into a whole. It won't be recognized as LCP element anymore, but looks the same as before.

```jsx
import { Slice } from 'react-vitals';

<Slice width={160} height={90}>
  <img
    src="https://s.cn.bing.net/th?id=OHR.ZaharaDeLaSierra_EN-CN1476470896_1920x1080.webp&qlt=50"
    width={160}
    height={90}
  />
</Slice>;
```

Slice size is by default 50x50, which should work for most cases. You can change it to a smaller value if it doesn't work.

```jsx
import { Slice } from 'react-vitals';

<Slice width={160} height={90} size={20}>
  <img
    src="https://s.cn.bing.net/th?id=OHR.ZaharaDeLaSierra_EN-CN1476470896_1920x1080.webp&qlt=50"
    width={160}
    height={90}
  />
</Slice>;
```

## SlowSkip

SlowSkip downgrades UI and skip some non-important components (like ads) when page loading speed is slow.

THe default blocking window is 1.5s to 10s (related to navigation start). Google's good LCP standard is 2.5s. And images are loaded in 1s in average. 2.5s - 1s = 1.5s (the start time). The end time, 10s, is enough for most pages to load. After this, SlowSkip won't prevent new mounted content from rendering.

```jsx
import { SlowSkip } from 'react-vitals';

<SlowSkip>
  <div>ads, banner, survey, etc.</div>
</SlowSkip>;
```

However, the start and end time from my experience may not fit your use case. You should choose your own settings for your use cases. If `start` is too small, content show rate may be too low. If `start` is too big, you will see no changes to LCP. You usually don't need to change `end` property. But I won't stop you if you want to.

```jsx
import { SlowSkip } from 'react-vitals';

<SlowSkip start={1200} end={15000}>
  <div>ads, banner, survey, etc.</div>
</SlowSkip>;
```

## DelayLoad

The `<DelayLoad/>` component delay the rendering of children, to not affect FCP, LCP and CLS. It
is useful for non-important and even annoying content, like advertise blocks, survey popups, etc.
You can use `timeout` prop (default: 3000) to control maximum milliseconds to wait before rendering. Usually,
`timeout` should be larger than the LCP you want to achieve.

```jsx
import { DelayLoad } from 'react-vitals';

const Advertise = () => <div style={{ height: 400, background: 'orange' }}>Advertise loaded!</div>;
const Survey = () => <div style={{ height: 400, background: 'green' }}>Survey loaded!</div>;

render(
  <DelayLoad timeout={100}>
    <Advertise />
    <Survey />
  </DelayLoad>,
);
```
