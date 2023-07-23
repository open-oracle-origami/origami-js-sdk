import { SyncOrAsyncFn } from '../types'

export const now = () => Math.floor(Date.now() / 1000)

export const poll = async (
  fn: SyncOrAsyncFn<any>,
  delayOrDelayCallback: number | SyncOrAsyncFn<number> = 5000,
  shouldStopPolling: SyncOrAsyncFn<any> = () => false
): Promise<void> => {
  do {
    await fn()

    if (await shouldStopPolling()) break

    const delay: number =
      typeof delayOrDelayCallback === 'number'
        ? delayOrDelayCallback
        : await delayOrDelayCallback()

    await new Promise(resolve => setTimeout(resolve, Math.max(0, delay)))
  } while (!(await shouldStopPolling()))
}
