export function showPlus(statMaximum: number, currentVal: number): boolean {
    if (statMaximum === 0) {
      return true;
    } else if  (statMaximum > 0 && currentVal < statMaximum) {
      return true;
    } else {
      return false;
    }
  }

export function showMinus(statMaximum: number, currentVal: number): boolean {
    if (statMaximum === 0) {
      return true;
    } else if  (statMaximum > 0 && currentVal > 0) {
      return true;
    } else {
      return false;
    }
  }