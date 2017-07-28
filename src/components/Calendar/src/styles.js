export function getStyle(view, numberOfColumn, numberOfSlot) {
  if (view === 'landscape') {
    return {
      width: 'calc((calc(100% - 100px) / ' + numberOfColumn + ') * ' + numberOfSlot + ')'
    };
  }

  return {
    height: 'calc(80px * ' + numberOfSlot + ')'
  };
}
