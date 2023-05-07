import { useEffect, useRef, useState } from 'react'

type State = {
 inView: boolean
 entry?: IntersectionObserverEntry
}

type ReturnTypes = {
 ref: React.Dispatch<React.SetStateAction<Element | null>>
 inView: boolean
 entry?: IntersectionObserverEntry
}

type ObserverInstanceCallback = (
 inView: boolean,
 entry: IntersectionObserverEntry,
) => void

export interface IntersectionOptions extends IntersectionObserverInit {
 root?: Element | null
 rootMargin?: string
 threshold?: number | number[]
 triggerOnce?: boolean
 skip?: boolean
 initialInView?: boolean
 fallbackInView?: boolean
 trackVisibility?: boolean
 delay?: number
 onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void
}

const observerMap = new Map<
 string,
 {
  id: string
  observer: IntersectionObserver
  elements: Map<Element, Array<ObserverInstanceCallback>>
 }
>()

const RootIds: WeakMap<Element | Document, string> = new WeakMap()
let rootId = 0

let unsupportedValue: boolean | undefined = undefined

function getRootId(root: IntersectionObserverInit['root']) {
 if (!root) return '0'
 if (RootIds.has(root)) return RootIds.get(root)
 rootId += 1
 RootIds.set(root, rootId.toString())
 return RootIds.get(root)
}

function optionsToId(options: IntersectionObserverInit) {
 return Object.keys(options)
  .sort()
  .filter((key) => options[key as keyof IntersectionObserverInit] !== undefined)
  .map(
   (key) =>
    `${key}_${
     key === 'root'
      ? getRootId(options.root)
      : options[key as keyof IntersectionObserverInit]
    }`,
  )
  .toString()
}

function createObserver(options: IntersectionObserverInit) {
 let id = optionsToId(options)
 let instance = observerMap.get(id)

 if (instance) {
  return instance
 }

 const elements = new Map<Element, Array<ObserverInstanceCallback>>()
 let thresholds: number[] | readonly number[]

 const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
   const inView =
    entry.isIntersecting &&
    thresholds.some((threshold) => entry.intersectionRatio >= threshold)

   // @ts-ignore support IntersectionObserver v2
   if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
    // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.
    // @ts-ignore
    entry.isVisible = inView
   }

   elements.get(entry.target)?.forEach((callback) => {
    callback(inView, entry)
   })
  })
 }, options)

 thresholds =
  observer.thresholds ||
  (Array.isArray(options.threshold)
   ? options.threshold
   : [options.threshold || 0])

 instance = {
  id,
  observer,
  elements,
 }

 observerMap.set(id, instance)

 return instance
}

function observe(
 element: Element,
 callback: ObserverInstanceCallback,
 options: IntersectionObserverInit = {},
 fallbackInView = unsupportedValue,
) {
 if (
  typeof window.IntersectionObserver === 'undefined' &&
  fallbackInView !== undefined
 ) {
  const bounds = element.getBoundingClientRect()
  callback(fallbackInView, {
   isIntersecting: fallbackInView,
   target: element,
   intersectionRatio:
    typeof options.threshold === 'number' ? options.threshold : 0,
   time: 0,
   boundingClientRect: bounds,
   intersectionRect: bounds,
   rootBounds: bounds,
  })
  return () => {
   // Nothing to cleanup
  }
 }

 const { id, observer, elements } = createObserver(options)

 let callbacks = elements.get(element) || []
 if (!elements.has(element)) {
  elements.set(element, callbacks)
 }

 callbacks.push(callback)
 observer.observe(element)

 return function unobserve() {
  callbacks.splice(callbacks.indexOf(callback), 1)

  if (callbacks.length === 0) {
   elements.delete(element)
   observer.unobserve(element)
  }

  if (elements.size === 0) {
   observer.disconnect()
   observerMap.delete(id)
  }
 }
}

export function useIntersectionObserver({
 threshold,
 delay,
 trackVisibility,
 rootMargin,
 root,
 triggerOnce,
 skip,
 initialInView,
 fallbackInView,
 onChange,
}: IntersectionOptions = {}): ReturnTypes {
 const [ref, setRef] = useState<Element | null>(null)
 const callback = useRef<IntersectionOptions['onChange']>()
 const [state, setState] = useState<State>({
  inView: !!initialInView,
  entry: undefined,
 })

 callback.current = onChange

 useEffect(
  () => {
   if (skip || !ref) return

   let unobserve: (() => void) | undefined
   unobserve = observe(
    ref,
    (inView, entry) => {
     setState({
      inView,
      entry,
     })
     if (callback.current) callback.current(inView, entry)

     if (entry.isIntersecting && triggerOnce && unobserve) {
      unobserve()
      unobserve = undefined
     }
    },
    {
     root,
     rootMargin,
     threshold,
     // @ts-ignore
     trackVisibility,
     // @ts-ignore
     delay,
    },
    fallbackInView,
   )

   return () => {
    if (unobserve) {
     unobserve()
    }
   }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [
   // If the threshold is an array, convert it to a string, so it won't change between renders.
   // eslint-disable-next-line react-hooks/exhaustive-deps
   Array.isArray(threshold) ? threshold.toString() : threshold,
   ref,
   root,
   rootMargin,
   triggerOnce,
   skip,
   trackVisibility,
   fallbackInView,
   delay,
  ],
 )

 const entryTarget = state.entry?.target
 const previousEntryTarget = useRef<Element>()

 if (
  !ref &&
  entryTarget &&
  !triggerOnce &&
  !skip &&
  previousEntryTarget.current !== entryTarget
 ) {
  // If we don't have a node ref, then reset the state (unless the hook is set to only `triggerOnce` or `skip`)
  // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView
  previousEntryTarget.current = entryTarget
  setState({
   inView: !!initialInView,
   entry: undefined,
  })
 }

 return {
  ref: setRef,
  inView: state.inView,
  entry: state.entry,
 }
}
