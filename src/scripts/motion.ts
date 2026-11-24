import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';
import 'number-flow';
import type NumberFlow from 'number-flow';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

/*
 * `once: true` заставляет ScrollTrigger удалять себя сразу после срабатывания.
 * Если это происходит во время первичного пересчёта (элемент уже на экране),
 * внутренний список триггеров меняется на лету и GSAP падает с
 * «Cannot read properties of undefined (reading 'end')».
 * Поэтому «один раз» реализуем без самоудаления: флагом для колбэков
 * и toggleActions для анимаций.
 */
const nativeCreate = ScrollTrigger.create.bind(ScrollTrigger);
// GSAP вызывает create(vars, animation) — второй аргумент обязательно передаём дальше.
(ScrollTrigger as any).create = (vars: ScrollTrigger.Vars, animation?: gsap.core.Animation) => {
  if (!vars?.once) return (nativeCreate as any)(vars, animation);
  const { once: _once, onEnter, ...rest } = vars;
  let done = false;
  return (nativeCreate as any)(
    {
      ...rest,
      ...(animation ? { toggleActions: 'play none none none' } : {}),
      onEnter: (self: ScrollTrigger) => {
        if (done) return;
        done = true;
        onEnter?.(self);
      },
    },
    animation,
  );
};

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

/* ------------------------------------------------------------------ */
/* Плавный скролл                                                      */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
(window as any).__lenis = lenis;

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href')!;
  if (id.length < 2) return;
  const target = document.querySelector<HTMLElement>(id);
  if (!target) return;
  e.preventDefault();
  document.dispatchEvent(new CustomEvent('nav:close'));
  if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
  else target.scrollIntoView({ behavior: 'auto' });
  history.replaceState(null, '', id);
});

/* ------------------------------------------------------------------ */
/* Счётчики с прокруткой цифр (NumberFlow)                             */
/* ------------------------------------------------------------------ */
export function makeFlow(host: HTMLElement): NumberFlow {
  const flow = document.createElement('number-flow') as NumberFlow;
  flow.locales = 'ru-RU';
  flow.format = { useGrouping: true, maximumFractionDigits: 0 };
  flow.numberPrefix = host.dataset.prefix ?? '';
  flow.numberSuffix = host.dataset.suffix ?? '';
  flow.transformTiming = { duration: 1400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' };
  flow.spinTiming = { duration: 2200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' };
  flow.opacityTiming = { duration: 450, easing: 'ease-out' };
  flow.respectMotionPreference = true;
  host.textContent = '';
  host.append(flow);
  return flow;
}

document.querySelectorAll<HTMLElement>('[data-count]').forEach((host) => {
  const to = Number(host.dataset.count);
  const from = Number(host.dataset.from ?? 0);
  const flow = makeFlow(host);
  flow.animated = false;
  flow.update(reduce ? to : from);
  requestAnimationFrame(() => (flow.animated = true));
  (host as any).__flow = flow;
  if (reduce) {
    host.dispatchEvent(new CustomEvent('counted'));
    return;
  }
  ScrollTrigger.create({
    trigger: host,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      const delay = Number(host.dataset.delay ?? 0);
      setTimeout(() => {
        flow.update(to);
        host.dispatchEvent(new CustomEvent('counted'));
      }, delay);
    },
  });
});

/* ------------------------------------------------------------------ */
/* Заголовки: слова выезжают снизу                                     */
/* ------------------------------------------------------------------ */
function splitWords(el: HTMLElement) {
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent!.split(/([ \t\n\r]+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^[ \t\n\r]+$/.test(p)) frag.append(document.createTextNode(p));
          else {
            const w = document.createElement('span');
            w.className = 'split-word';
            const inner = document.createElement('span');
            inner.textContent = p;
            w.append(inner);
            frag.append(w);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
  return el.querySelectorAll<HTMLElement>('.split-word > span');
}

if (!reduce) {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const words = splitWords(el);
    const immediate = el.dataset.split === 'now';
    gsap.from(words, {
      yPercent: 110,
      rotate: 4,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.06,
      delay: immediate ? Number(el.dataset.splitDelay ?? 0.25) : 0,
      scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 85%', once: true },
    });
  });

  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.fromTo(
        els,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true },
      ),
  });

  /* Фото раскрываются «шторкой» */
  document.querySelectorAll<HTMLElement>('[data-mask]').forEach((el) => {
    const img = el.querySelector('img');
    const dir = el.dataset.mask || 'up';
    const from = dir === 'left' ? 'inset(0 100% 0 0)' : dir === 'right' ? 'inset(0 0 0 100%)' : 'inset(100% 0 0 0)';
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' });
    if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0.2);
  });

  /* Медленный зум фото при прокрутке */
  document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 1.18, yPercent: -4 },
      { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  /* Параллакс декоративных элементов */
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 80);
    gsap.fromTo(
      el,
      { y: -amount / 2 },
      {
        y: amount / 2,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
} else {
  gsap.set('[data-reveal]', { opacity: 1 });
}

/* ------------------------------------------------------------------ */
/* Наклон карточек за курсором                                          */
/* ------------------------------------------------------------------ */
if (!reduce && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt || 8);
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    gsap.set(el, { transformPerspective: 900 });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
    });
    el.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

export { gsap, ScrollTrigger, reduce, isDesktop, lenis };

window.addEventListener('load', () => ScrollTrigger.refresh());
