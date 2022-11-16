import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import yaml from './data.yaml';
import printMe from './print';

console.log(yaml.title);

const component = () => {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
};

document.body.appendChild(component());
