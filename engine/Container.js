import DisplayObject from "./core/DisplayObject";

class Container extends DisplayObject {
  constructor(args = {}) {
    super(args);

    this.displayObjects = [];
  }

  add(...displayObjects) {
    displayObjects.forEach((displayObject) => {
      if (!this.displayObjects.includes(displayObject)) {
        this.displayObjects.push(displayObject);
        displayObject.setParent(this);
      }
    });
  }

  tick() {
    this.displayObjects.forEach((displayObject) => {
      if (displayObject.tick) {
        displayObject.tick();
      }
    });
  }

  remove(...displayObjects) {
    displayObjects.forEach((displayObject) => {
      if (this.displayObjects.includes(displayObject)) {
        const idx = this.displayObjects.indexOf(displayObject);
        this.displayObjects.splice(idx, 1);
        displayObject.setParent(null);
      }
    });
  }

  draw(canvas, context) {
    super.draw(() => {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.scale(this.scaleX, this.scaleY);

      for (let displayObject of this.displayObjects) {
        displayObject.draw(canvas, context);
      }

      context.restore();
    });
  }
}

export default Container;
