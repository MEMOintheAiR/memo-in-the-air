export function setXPosition(userPosition: number, memoPosition: number): number {
  return ((userPosition - memoPosition) * 0.111) / 0.000001;
}

export function setYPosition(userPosition: number, memoPosition: number): number {
  return memoPosition - userPosition;
}

export function setZPosition(userPosition: number, memoPosition: number): number {
  return ((userPosition - memoPosition) * 0.089) / 0.000001;
}
