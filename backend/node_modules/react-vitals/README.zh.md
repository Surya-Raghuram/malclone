[English](./README.md) | **中文**

# React Vitals

用于提升 [Web Vitals](https://web.dev/articles/vitals?hl=zh-cn) 评分 (FCP, LCP, CLS, INP) 的 React 组件，钩子和工具集合。

## AfterClick

目前，LCP 计算 DOM 元素会在用户交互后停止。所以你可以在用户点击页面之后再展示广告和弹窗，以避免 LCP 增加。

AfterClick 组件就是用来将内容延迟到用户点击之后挂载。

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

LCP 的意思是 Largest Content Painting，最大内容绘制。通常 LCP 元素是图片或者大块文字。

Slice 将一个大的块切成很多小块，再拼接起来。这样就无法被识别为 LCP 元素，而且视觉上和原来没有什么不同。

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

Slice 切片的默认尺寸是 50x50，可以适应大多数情况。如果它不生效的话，你可以改成更小的值。

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

SlowSkip 是当页面首次加载速度较慢时进行降级，跳过某些非功能组件的渲染，比如广告等。

默认的阻断窗口期为 1.5s 到 10s。Google 设定的 LCP 优的标准是 2.5s，按照经验图片等内容的平均加载时间为 1s 左右，2.5s 减去 1s 就得到了 1.5s 的默认值。

```jsx
import { SlowSkip } from 'react-vitals';

<SlowSkip>
  <div>广告，横幅，不重要的弹窗等</div>
</SlowSkip>;
```

默认阻断窗口毕竟只是一个经验值，并非适用于所有场合。你需要根据实际 Web Vitals 统计数据来调整 `start` 值，以避免数值太小导致内容展示率过低，或者数值太大导致 LCP 无变化。`end` 的值通常不需要调整，但是如果你想的话，也是可以的。

```jsx
import { SlowSkip } from 'react-vitals';

<SlowSkip start={1200} end={15000}>
  <div>广告，横幅，不重要的弹窗等</div>
</SlowSkip>;
```
