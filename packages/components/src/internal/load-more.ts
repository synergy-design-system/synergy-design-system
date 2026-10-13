import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type LoadMoreControllerOptions = {
  /** Minimum time in ms between two consecutive `onLoadMore` triggers. Guards against request flooding. */
  cooldown?: number;
  /** Passed to the IntersectionObserver so loading can start slightly before the sentinel is fully visible. */
  rootMargin?: string;
  /** Called once the sentinel becomes visible and the cooldown has elapsed. */
  onLoadMore: () => void;
};

/**
 * A reactive controller that notifies the host once a scrollable listbox has been scrolled close to its
 * end, so more options can be loaded (e.g. from a paged/async data source).
 *
 * Usage: render a sentinel element as the last child of the scrollable container, then call `observe()`
 * with the scroll container and the sentinel whenever the option list changes (initial render, and every
 * time new options are appended). The controller automatically stops observing after a trigger and only
 * resumes once `observe()` is called again, so it won't fire repeatedly while new data is still loading.
 */
export class LoadMoreController implements ReactiveController {
  private readonly options: Required<LoadMoreControllerOptions>;

  private observer?: IntersectionObserver;

  private lastTriggeredAt = 0;

  private pendingTriggerTimer?: ReturnType<typeof setTimeout>;

  constructor(host: ReactiveControllerHost, options: LoadMoreControllerOptions) {
    host.addController(this);
    this.options = {
      cooldown: 200,
      rootMargin: '0px 0px 200px 0px',
      ...options,
    };
  }

  hostDisconnected() {
    this.observer?.disconnect();
    clearTimeout(this.pendingTriggerTimer);
  }

  /**
   * (Re)arms the sentinel for the given scroll root. Safe to call repeatedly, e.g. whenever the
   * observed option list changes: re-observing an already-observed sentinel is a no-op per spec,
   * and it re-enables triggering after a previous fire stopped observation.
   */
  observe(root: Element, sentinel: Element) {
    if (!this.observer) {
      this.observer = new IntersectionObserver(this.handleIntersect, {
        root,
        rootMargin: this.options.rootMargin,
      });
    }

    this.observer.observe(sentinel);
  }

  private handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const entry = entries.at(0);
    if (!entry?.isIntersecting) {
      // The sentinel left the viewport again before the cooldown elapsed, e.g. the user scrolled
      // away. Cancel the pending retry, as IntersectionObserver won't notify us again on its own
      // while nothing about the intersection state changes.
      clearTimeout(this.pendingTriggerTimer);
      return;
    }

    const elapsed = Date.now() - this.lastTriggeredAt;
    if (elapsed >= this.options.cooldown) {
      this.trigger(entry.target);
      return;
    }

    // Still within cooldown: schedule the trigger for once it elapses instead of dropping it.
    // IntersectionObserver only calls back on state changes, so if we did nothing here, the
    // sentinel could stay intersecting indefinitely without ever firing again.
    clearTimeout(this.pendingTriggerTimer);
    this.pendingTriggerTimer = setTimeout(() => this.trigger(entry.target), this.options.cooldown - elapsed);
  };

  private trigger(target: Element) {
    this.lastTriggeredAt = Date.now();
    // Stop observing until the host re-arms us via `observe()`, e.g. once new options have rendered.
    this.observer?.unobserve(target);
    this.options.onLoadMore();
  }
}
