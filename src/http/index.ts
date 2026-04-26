import type { Message } from '../types.ts'

const VIEW_API_URL = 'https://hotaru.icu/api/utils/view/himeno-sena'

export function getViews(): Promise<number> {
  if (!('HIMENO_SENA_BUILD_TIME' in globalThis)) return Promise.resolve(0)
  return fetch(VIEW_API_URL)
    .then((res) => res.text())
    .then((value) => {
      const num = Number.parseInt(value, 10)
      if (!Number.isNaN(num)) return num
      throw new Error()
    })
}

export function postView() {
  if (!('HIMENO_SENA_BUILD_TIME' in globalThis)) return Promise.resolve()
  return fetch(VIEW_API_URL, { method: 'POST' }) as unknown as Promise<void>
}

export function fetchMessageList(): Promise<Message[]> {
  return fetch('https://cdn.jsdelivr.net/gh/biyuehu/himenosena/public/messages.json').then((res) => res.json())
}
