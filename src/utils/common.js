const { floor, random } = Math

export function randomOf (array) {
  const idx = floor(random() * array.length)
  return array[idx]
}

export function randomSomeOf(array, n) {
  return array.map((item, idx) => ({ ...item, idx }))
    .sort(() => 0.5 - random())
    .slice(0, n)
    .sort((a, b) => a.idx - b.idx)
    .map(({idx, ...item}) => (item))
}

export function timeFormat(time) {
  const hour = floor(time / 3600)
  let remain = time % 3600
  const minute = floor(remain / 60)
  const second = remain % 60
  return [{ label: 'hr', value: hour }, { label: 'min', value: minute }, { label: 'sec', value: second }].map(i => {
    return i.value === 0
      ? ''
      : `${i.value} ${i.label}`
  }).filter(i => i !== '').join(' ')
}
