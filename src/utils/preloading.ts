let imgs_arr: HTMLImageElement[] = []
export function preload() {
    const imgs = document.querySelectorAll('.preload') as NodeListOf<HTMLImageElement>
    console.log(imgs_arr)
    Array.prototype.forEach.call(imgs, (img:HTMLImageElement) => {
        if(imgs_arr.indexOf(img) === -1){
            console.log(img)
            imgs_arr.push(img)
            let newImge = new Image()
            let trueSrc = img.getAttribute('data-src') as string
            newImge.src = trueSrc
            newImge.onload = () => {
                img.classList.remove('preload')
                img.style.backgroundImage = `url(${trueSrc})`
                img.removeAttribute('data-src')
            }
        }
    })
}