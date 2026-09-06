---
title: "Accelerating 2D Numerical Simulation with WebGL Fragment Shaders"
description: "Why CPU canvas loops drop frames on live data streams, and how GPU.js compiles mathematical kernels directly to WebGL."
pubDate: "Nov 12 2024"
---

When visualizing live numerical data in a browser—such as Fourier transforms, phase portraits, or streaming sensor telemetry—traditional HTML5 `CanvasRenderingContext2D` quickly runs into performance barriers.

Evaluating mathematical functions point-by-point in JavaScript and issuing `ctx.lineTo()` or `ctx.fillRect()` calls forces every pixel calculation through single-threaded CPU execution. On high-resolution displays evaluating hundreds of thousands of sample points per frame, frame rates plunge below 15 FPS.

## The WebGL Pipeline Without Boilerplate

Writing raw WebGL requires managing vertex buffers, attribute pointers, uniform bindings, and shader compilation pipelines. For data visualization tools, this overhead is burdensome.

In [`gpujs-real-renderer`](https://github.com/PranavPurwar/gpujs-real-renderer), we leverage GPU.js to compile JavaScript functions directly into GLSL fragment shaders at runtime. Instead of calculating coordinates sequentially on the CPU:

1. The data domain is mapped to a 2D texture viewport.
2. The fragment shader executes concurrently across thousands of GPU shader cores.
3. The resulting image buffer is drawn directly to a hardware-accelerated canvas in a single draw call.

```typescript
import { RealComplexSpace } from 'gpujs-real-renderer';

const space = new RealComplexSpace({
  canvas: document.getElementById('render-canvas') as HTMLCanvasElement,
  xScale: 2,
  yScale: 2
});

// Evaluates Mandelbrot escape velocities in parallel on GPU cores
space.draw({
  func: 'z = z^2 + c',
  iterations: 150
});
```

## Running Headless in Node.js

A critical design requirement was allowing the same rendering logic to generate static plots on a backend server without a physical display.

By injecting a headless WebGL context (`gl`) and a mock canvas implementation, `gpujs-real-renderer` executes the same shader kernels in Node.js processes. This enables generating high-resolution mathematical charts for server-side report generation at 60+ FPS equivalent throughput.

