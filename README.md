# Weishaupt.js - Poor man's Ambilight 🪔

Adds a halo effect around your video player. It's not as good as Ambilight, only in a browser, but it's free.

Named after the founder of the Illuminati, [Adam Weishaupt](https://en.wikipedia.org/wiki/Adam_Weishaupt).

Demo is available at [weishauptjs.vercel.app](https://weishauptjs.vercel.app).

**Note:** This is a proof of concept. It's not optimized for performance. And there are still some issues with purely black parts of the video.

## Installation and Usage

```html
<video src="sample1.mp4" loop autoplay muted></video>

<script src="weishaupt.js"></script>

<script>
  const video = document.querySelector('video');
  weishaupt(video);
</script>
```

Run a local server and open the `index.html` file.

## Options

- element: The video element.
- spreadSize: The size of the spread.
- spread: The spread.
- animationSpeed: The speed of the animation.
- colorMultiplier: The multiplier of the color.
- lightnessThreshold: The threshold of the lightness.
- alpha: The alpha of the color.
