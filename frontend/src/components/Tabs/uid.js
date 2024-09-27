export const uid = () => {
    let timmy = Date.now().toString(36).toUpperCase();
    let randy = Math.random().toString(36).substr(2, 12).toUpperCase();
    return ''.concat(timmy, '-', randy);
  };
  