const configureBoard = () => {
  const canvas = document.getElementById('go-board');
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = '#ffbf00'; //wood color
  ctx.fillRect(33.33, 33.33, 533.33, 533.33);

  // outer border
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
<<<<<<< HEAD
=======
  // ctx.beginPath();
  // ctx.moveTo(33.33, 33.33);
  // ctx.lineTo(33.33, 566.66);
  // ctx.lineTo(566.66, 566.66);
  // ctx.lineTo(566.66, 33.33);
  // ctx.lineTo(33.33, 33.33);
  // ctx.stroke();
>>>>>>> bed4cf7... Finish board styling

  // vertical lines
  for (let i = 33.33; i < 600; i += 66.66) {
    ctx.beginPath();
    ctx.moveTo(i, 33.33);
    ctx.lineTo(i, 566.66);
    ctx.stroke();
  }

  // horizontal lines
  for (let j = 33.33; j < 600; j += 66.66) {
    ctx.beginPath();
    ctx.moveTo(33.33, j);
    ctx.lineTo(566.66, j);
    ctx.stroke();
  }

  // reference points
  ctx.fillStyle = 'black'
  const coords = [166.65, 433.35];
  coords.forEach((i) => {
    coords.forEach((j) => {
      ctx.beginPath();
      ctx.arc(i, j, 5, 0, 2*Math.PI);
      ctx.fill();
      ctx.stroke();
    });
  });

  ctx.beginPath();
  ctx.arc(300, 300, 5, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();

  //
};

export default configureBoard;
