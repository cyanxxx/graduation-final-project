const imgs_arr: HTMLImageElement[] = [];
export function preload() {
  const imgs = document.querySelectorAll('.preload') as NodeListOf<HTMLImageElement>;
  Array.prototype.forEach.call(imgs, (img: HTMLImageElement) => {
    if (imgs_arr.indexOf(img) === -1) {
      imgs_arr.push(img);
      const newImge = new Image();
      const trueSrc = img.getAttribute('data-src') as string;
      newImge.src = trueSrc;
      newImge.onload = () => {
        img.classList.remove('preload');
        img.style.backgroundImage = `url(${trueSrc})`;
        img.removeAttribute('data-src');
      };
    }
  });
}
