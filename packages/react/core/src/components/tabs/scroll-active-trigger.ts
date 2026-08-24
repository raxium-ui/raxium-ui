export function scrollActiveTriggerIntoView(
  tabsListEl: HTMLElement,
  curValue: string,
): void {
  const tabTriggerEls = Array.from(
    tabsListEl.querySelectorAll('[data-part="trigger"]'),
  ) as HTMLElement[]
  if (!tabTriggerEls.length)
    return

  const curIndex = tabTriggerEls.findIndex(el => el.getAttribute('data-value') === curValue)
  if (curIndex < 0)
    return

  const listRect = tabsListEl.getBoundingClientRect()
  const lastIndex = tabTriggerEls.length - 1
  const prevRect = tabTriggerEls[curIndex - 1 < 0 ? lastIndex : curIndex - 1]?.getBoundingClientRect()
  const curRect = tabTriggerEls[curIndex]?.getBoundingClientRect()
  const nextRect = tabTriggerEls[curIndex + 1 === tabTriggerEls.length ? 0 : curIndex + 1]
    ?.getBoundingClientRect()

  if (!curRect)
    return

  const deltaX = curRect.x - listRect.x

  if (
    (curIndex === 0 && deltaX <= 0)
    || (curIndex > 0 && deltaX <= 0 && Math.abs(deltaX) >= curRect.width)
  ) {
    tabsListEl.scrollBy({
      left: prevRect ? -(Math.abs(deltaX) + curRect.width) - prevRect.width / 2 : -9999,
      behavior: 'smooth',
    })
    return
  }

  if (deltaX < 0 && Math.abs(deltaX) < curRect.width) {
    tabsListEl.scrollBy({
      left: prevRect ? deltaX - prevRect.width / 2 : -curRect.width,
      behavior: 'smooth',
    })
    return
  }

  if (deltaX > 0 && prevRect && deltaX < prevRect.width / 2) {
    tabsListEl.scrollBy({
      left: -(prevRect.width / 2 - deltaX),
      behavior: 'smooth',
    })
    return
  }

  if (deltaX >= listRect.width) {
    tabsListEl.scrollBy({
      left: nextRect ? deltaX - listRect.width + curRect.width + nextRect.width / 2 : 9999,
      behavior: 'smooth',
    })
    return
  }

  if (deltaX < listRect.width && curRect.width + curRect.x > listRect.width + listRect.x) {
    tabsListEl.scrollBy({
      left: nextRect ? deltaX + curRect.width - listRect.width + nextRect.width / 2 : curRect.width,
      behavior: 'smooth',
    })
    return
  }

  if (
    deltaX < listRect.width
    && nextRect
    && nextRect.x - listRect.x + nextRect.width / 2 > listRect.width
  ) {
    tabsListEl.scrollBy({
      left: nextRect.width / 2 - (listRect.width - (nextRect.x - listRect.x)),
      behavior: 'smooth',
    })
  }
}
