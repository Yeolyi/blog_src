---
title: Concurrency와 Parallelism
---

[Concurrency vs. Parallelism — A brief view](https://medium.com/@itIsMadhavan/concurrency-vs-parallelism-a-brief-review-b337c8dac350)에서 발췌.

Concurrency(동시성) means executing multiple tasks at the same time but not necessarily simultaneously. 

Parallelism(병렬성) means that an application splits its tasks up into smaller subtasks which can be processed in parallel, for instance on multiple CPUs at the exact same time.

A system is said to be concurrent if it can support two or more actions **in progress** at the same time. A system is said to be parallel if it can support two or more actions executing simultaneously.