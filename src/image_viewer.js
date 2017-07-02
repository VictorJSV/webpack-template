import small from './assets/images/small.jpg';
import './assets/styles/image_viewer.css'

export default () => {
  const image = document.createElement('img');
  image.src = small;
  document.body.appendChild(image);
}
