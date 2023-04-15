import mitt from 'mitt'
let emitter = null
export function useEmitter() {
  if (!emitter) {
    emitter = mitt()
  }
  return emitter
}
