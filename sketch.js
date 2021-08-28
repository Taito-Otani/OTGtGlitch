var s = function (p) {
  let num = 2000;
  let range = 20;
  let i;
  let ax = [];
  let ay = [];
  var v1 = 4;
  //--------------- Setup ---------------------
  p.setup = function () {
    p.createCanvas(innerWidth, innerHeight);
    for (i = 0; i < num; i++) {
      ax[i] = p.width / 2;
      ay[i] = p.height / 2;
    }
    
    window.max.bindInlet('set_value', function(_v1) {
            v1 = _v1;
    });
    
    p.frameRate(v1);
    p.strokeWeight(1);
  };

  //--------------- Draw ---------------------
  p.draw = function () {
       p.frameRate(v1);
	let g = p.map(p.mouseX,0,p.width, 0 , 20);
    p.background(213, 238, 187);

    // Shift all elements 1 place to the left
    for (i = 1; i < num; i++) {
      ax[i - 1] = ax[i];
      ay[i - 1] = ay[i];
    }
    // Put a new value at the end of the array
    ax[num - 1] += p.random(-range, range);
    ay[num - 1] += p.random(-range, range);

    // Constrain all points to the screen
    ax[num - 1] = p.constrain(ax[num - 1], 0, p.width);
    ay[num - 1] = p.constrain(ay[num - 1], 0, p.height);
	  // 直線に色付きのぼやけた影をつける
  	//p.drawingContext.shadowBlur = 10;
  	//p.drawingContext.shadowColor = p.color(213, 238, 187);
    // Draw a line connecting the points
    for (i = 1; i < num; i++) {
      let val = (i / num);
      p.stroke(127*val, 200*val, 169*val);
  
      p.line(ax[i - 1], ay[i - 1], ax[i], ay[i]);
    }
	//p.ellipse(ax[num-1], ay[num-1],10,10);
    window.max.outlet('output', p.frameCount, ax[num-2], ay[num-2], ax[num-1], ay[num-1],p.width,p.height);
    // カンマ区切りで出力したい値を追加できます。
    //テキストキャンバスに表示
  };

  // マウスを押した時に呼ばれる関数
  p.mousePressed = function () {};

  //--------------- ReSize---------------------
  //画面サイズの自動調整
  p.windowResized = function () {
    p.resizeCanvas(innerWidth, innerHeight);
  };
};

const myp5 = new p5(s);
