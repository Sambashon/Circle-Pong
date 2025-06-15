    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const arenaRadius = 200;

    // Paddle
    const paddleLength = 80; // degrees
    let paddleAngle = 0;
    const paddleSpeed = 0.05;

    // Ball
    let ballAngle = 0;
    let ballDist = 0;
    let ballDir = 0;
    let ballSpeed = 0;
    let ballMoving = false;

    const keys = {
      ArrowLeft: false,
      ArrowRight: false
    };

    document.addEventListener("keydown", (e) => {
      if (e.key in keys) keys[e.key] = true;
      if (e.code === "Space" && !ballMoving) launchBall();
    });

    document.addEventListener("keyup", (e) => {
      if (e.key in keys) keys[e.key] = false;
    });

    function launchBall() {
      ballMoving = true;
      ballDist = 10;
      ballAngle = Math.random() * Math.PI * 2;
      ballDir = Math.random() * Math.PI * 2;
      ballSpeed = 2 + Math.random() * 2;
    }

    function resetBall() {
      ballMoving = false;
      ballDist = 0;
      ballSpeed = 0;
    }

    function update() {
      if (keys.ArrowLeft) paddleAngle -= paddleSpeed;
      if (keys.ArrowRight) paddleAngle += paddleSpeed;

      if (!ballMoving) return;

      const dx = ballSpeed * Math.cos(ballDir);
      const dy = ballSpeed * Math.sin(ballDir);
      ballDist += dx * Math.cos(ballAngle) + dy * Math.sin(ballAngle);
      ballAngle += (-dx * Math.sin(ballAngle) + dy * Math.cos(ballAngle)) / ballDist;

      if (ballDist >= arenaRadius - 10) {
        const relativeAngle = ((ballAngle - paddleAngle + Math.PI * 2) % (Math.PI * 2)) * 180 / Math.PI;

        if (relativeAngle < paddleLength / 2 || relativeAngle > 360 - paddleLength / 2) {
          ballDir = Math.PI + ballDir + (Math.random() - 0.5); // reflect + randomness
          ballSpeed = 2 + Math.random() * 2;
          ballDist = arenaRadius - 10;
        } else {
          resetBall();
        }
      }

      // Keep angles between 0 and 2π
      ballAngle = (ballAngle + Math.PI * 2) % (Math.PI * 2);
      paddleAngle = (paddleAngle + Math.PI * 2) % (Math.PI * 2);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Arena circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, arenaRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Paddle
      const start = paddleAngle - (paddleLength / 2) * Math.PI / 180;
      const end = paddleAngle + (paddleLength / 2) * Math.PI / 180;
      ctx.beginPath();
      ctx.arc(centerX, centerY, arenaRadius, start, end);
      ctx.strokeStyle = "lime";
      ctx.lineWidth = 10;
      ctx.stroke();

      // Ball
      const ballX = centerX + ballDist * Math.cos(ballAngle);
      const ballY = centerY + ballDist * Math.sin(ballAngle);
      ctx.beginPath();
      ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
      ctx.fillStyle = "cyan";
      ctx.fill();

      // Message
      if (!ballMoving) {
        ctx.fillStyle = "white";
        ctx.font = "20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACE to launch", centerX, centerY);
      }
    }

    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }

    loop();