AFRAME.registerComponent("aabb-collider-listener", {
    init: function () {
      const self = this;
      this.el.addEventListener("hitstart", function (e) {
        console.log("hitstart");
        self.el.parentNode.removeChild(self.el);
        
        if (self.el.classList.contains("collectible")) {
        checkMinigameEnd();
      }
      });

      this.el.addEventListener("hitend", function (e) {
        console.log("hitend");
      });
    },
  });

AFRAME.registerComponent('coin-movement', {
  schema: {
    path: { type: 'array' }, // Array of positions defining the path
    speed: { default: 1 } // Speed of movement
  },

  init: function () {
    this.currentIndex = 0;
  },

  tick: function (time, timeDelta) {
    const { path, speed } = this.data;

    const currentPosition = this.el.object3D.position;
    const targetPosition = new THREE.Vector3().fromArray(path[this.currentIndex]);
    const direction = targetPosition.clone().sub(currentPosition).normalize();
    const distanceToMove = speed * (timeDelta / 1000);
    currentPosition.add(direction.multiplyScalar(distanceToMove));

    const distanceToTarget = currentPosition.distanceTo(targetPosition);
    if (distanceToTarget < 0.1) {
      this.currentIndex = (this.currentIndex + 1) % path.length;
    }
  }
});