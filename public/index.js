const htmlTitleEle = () => {
  const htmlTitleEle = document.createElement('h1');
  htmlTitleEle.innerText = 'Running...';
  return htmlTitleEle;
}

const title = htmlTitleEle();

document.body.appendChild( title );

title.innerText = 'Finished...';