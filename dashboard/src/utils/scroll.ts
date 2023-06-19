export const scrollToPos = (elementPos: number) => {
  window.scrollTo({
    top: elementPos,
    behavior: 'smooth'
  });
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
