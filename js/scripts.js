function handleMarkerValue(value) {
  switch (value) {
    case '1':
      loadAsset(value, `./assets/${value}.glb`);
      break;
    case '2':
      loadAsset(value, `./assets/${value}.glb`);
      break;
    case '3':
      loadAsset(value, `./assets/${value}.glb`);
      break;
    case '4':
      loadAsset(value, `./assets/${value}.glb`);
      break;
    case '5':
      loadAsset(value, `./assets/${value}.glb`);
      break;
    case '6':
      loadAsset(value, `./assets/${value}.glb`);
      break;
    case '7':
      loadAsset(value, `./assets/${value}.glb`);
      break;
    case '8':
        const forwardButton = document.getElementById('button-forward');
        const rightButton = document.getElementById('button-rotate-right');
        const leftButton = document.getElementById('button-rotate-left');

          if (window.loadMinigameStatus[7]) {
              addMinigameEntitiesToMarker8()
              forwardButton.style.display = 'flex';
              rightButton.style.display = 'flex';
              leftButton.style.display = 'flex';
          } else { 
              loadAsset(value, `./assets/${value}.glb`);
              forwardButton.style.display = 'none';
              rightButton.style.display = 'none';
              leftButton.style.display = 'none';
          }

      break;
    default:
      console.error('Invalid marker value:', value);
  }
}

function getEntityByGltfModel(id) {
  const entities = document.querySelectorAll('a-entity[gltf-model]');
  
  for (const entity of entities) {
    if (entity.getAttribute('gltf-model') === id) {
      return entity;
    }
  }
  
  return null;
}

function getAssetById(id) {
  const entities = document.querySelectorAll('a-asset-item[id]');
    
  for (const entity of entities) {
    if (entity.getAttribute('id') === id) {
      return entity;
    }
  }
  
  return null;
}

function loadAsset(id, src) {
    const assetItem = getAssetById(id);

    if (!assetItem) {
        const asset = document.createElement('a-asset-item');
        asset.setAttribute('id', id);
        asset.setAttribute('src', src);
        document.querySelector('a-assets').appendChild(asset);

        const entity = document.createElement('a-entity');
        entity.setAttribute('id', 'model-' + id);
            entity.setAttribute('gltf-model', '#' + id);
            entity.setAttribute('position', '0 0 0');
            entity.setAttribute('scale', '4 4 4');
            entity.setAttribute('class', 'clickable');
            entity.setAttribute('gesture-handler', '');

        const marker = document.querySelector('#marker' + id);
        marker.appendChild(entity);
    }
}

function unloadAsset(asset) {
    if (asset) {
        asset.parentNode.removeChild(asset);
    }
}

function unloadEntity(entity){
    if (entity) {
        entity.parentNode.removeChild(entity);
    }  
}

function unloadUnusedModels() { // deletes all assets and entities that have a different id from their respective marker
    const allAssets = document.querySelectorAll('a-asset-item');
    const allEntitiesCollectible = document.querySelectorAll('a-entity.collectible');
    const allMarkers = document.querySelectorAll('a-marker');
    const markerValues = [];

    allMarkers.forEach(function (marker) {
    markerValues.push(marker.getAttribute('value'));
  });

  if (allAssets) {
  allAssets.forEach(function (asset) {
      const assetId = asset.getAttribute('id');
      if ( !markerValues.includes(assetId) ) {
        if (assetId !== "player") {
          unloadAsset(asset);
        }
      }
  });
  }

  if (allEntitiesCollectible) {
    allEntitiesCollectible.forEach(function (entity) {
        const entityId = entity.getAttribute('id');
        const entityIdParts = entityId.split('-');
        const entityMarkerValue = entityIdParts[1];
        if (!markerValues.includes(entityMarkerValue)) {
          unloadEntity(entity);
      }
    });
  }

  const playerModel = document.querySelector('#model-player');
  if (playerModel) {
      unloadEntity(playerModel);
  }
}


function moveForward() {
    if (window.buttonForwardPressed) {
        requestAnimationFrame(moveForward);
        moveModel();
    }
}

function moveModel() {
  const modelEntity = document.querySelector('#model-player');
  if (modelEntity) {
      modelEntity.setAttribute('animation-mixer', 'clip: Gallop');
      const currentRotation = modelEntity.getAttribute('rotation');
      const currentRotationY = THREE.Math.degToRad(currentRotation.y); 
      const step = 0.05;
      const moveDirection = new THREE.Vector3(Math.sin(currentRotationY), 0, Math.cos(currentRotationY));
      modelEntity.object3D.position.add(moveDirection.multiplyScalar(step));
  } else {
      console.error('Player entity not found');
  }
}

function rotate() {
     if (window.buttonLeftPressed || window.buttonRightPressed) {
        requestAnimationFrame(rotate);
        const direction = window.buttonLeftPressed ? 'left' : 'right';
        rotateModel(window.currentMarkerValue, direction);
      }
    }


function rotateModel(markerValue, direction) {
  const modelEntity = document.querySelector('#model-player');
  if (modelEntity) {
      modelEntity.setAttribute('animation-mixer', 'clip: Walk' ); // change this to your walking animation
      const currentRotation = modelEntity.getAttribute('rotation');
      const rotationStep = 5; 
      switch (direction) {
        case 'left':
          modelEntity.setAttribute('rotation', { x: currentRotation.x, y: currentRotation.y + rotationStep, z: currentRotation.z });
          break;
        case 'right':
          modelEntity.setAttribute('rotation', { x: currentRotation.x, y: currentRotation.y - rotationStep, z: currentRotation.z });
          break;
        default:
          break;
      }
  } else {
      console.error('Player entity not found');
  }
}

function checkMinigameEnd() {
  const coins = document.querySelectorAll('.collectible');
  const allCoinsCollected = Array.from(coins).every(coin => coin.parentNode === null);

  if (allCoinsCollected) {
      switch (window.currentMarkerValue) {
    case '1':
      break;
    case '2':
      break;
    case '3':
      break;
    case '4':
      break;
    case '5':
      break;
    case '6':
      break;
    case '7':
      break;
    case '8':
        window.loadMinigameStatus[7] = false;
        unloadUnusedModels();
        handleMarkerValue(window.currentMarkerValue);
        console.log("All coins collected!");
      break;
    default:
      console.error('Invalid marker value:', window.currentMarkerValue);
   }
  }
}

function addMinigameEntitiesToMarker8() {
    const marker = document.querySelector('#marker' + window.currentMarkerValue);
    if (!marker) {
    console.error('Marker with value 8 not found');
    return;
  }

   const assets = document.querySelector('a-assets');
  if (assets) {
    const yellowDuckAsset = document.createElement('a-asset-item');
    yellowDuckAsset.setAttribute('id', 'yellow-duck'); // "coin" asset to collect
    yellowDuckAsset.setAttribute('src', './assets/YellowDuck.glb');
    assets.appendChild(yellowDuckAsset);
  } else {
    console.error('a-assets not found');
  }

  const modelEntity = document.createElement('a-gltf-model');
  modelEntity.setAttribute('id', 'model-player');
  modelEntity.setAttribute('gltf-model', '#player');
  modelEntity.setAttribute('position', '0 0 2');
  modelEntity.setAttribute('rotation', '0 180 0');
  modelEntity.setAttribute('scale', '0.3 0.3 0.3');
  modelEntity.setAttribute('class', 'clickable');
  modelEntity.setAttribute('animation-mixer', 'clip: Idle_2'); // change this to your idle animation
  modelEntity.setAttribute('aabb-collider', 'objects: a-entity');

  marker.appendChild(modelEntity);

    // the shiba inu model has low emissivity, so we need to increase the intensity
    modelEntity.addEventListener('model-loaded', function () {
        const mesh = modelEntity.getObject3D('mesh');
        if (mesh) {
            mesh.traverse(function (node) {
                if (node.isMesh) {
                    node.material.emissive.set('#ffffff');
                    node.material.emissiveIntensity = 0.3;
                }
            });
        }
    });

  const coin1Entity = document.createElement('a-entity');
  coin1Entity.setAttribute('id', 'model-coin1');
  coin1Entity.setAttribute('gltf-model', '#yellow-duck');
  coin1Entity.setAttribute('class', 'collectible');
  coin1Entity.setAttribute('position', '-1 0 -2');
  coin1Entity.setAttribute('rotation', '0 0 0');
  coin1Entity.setAttribute('scale', '0.03 0.03 0.03');
  coin1Entity.setAttribute('aabb-collider', 'objects: a-gltf-model');
  coin1Entity.setAttribute('aabb-collider-listener', '');
  coin1Entity.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 5000');
  coin1Entity.setAttribute('coin-movement', { path: [[-1, 0, -2], [-0.5, 0, -1.5], [0, 0, -1], [-0.5, 0, -0.5], [-1, 0, -1], [-0.5, 0, -1.5], [0, 0, -2], [-0.5, 0, -2.5], [-1, 0, -2]], speed: 1 });

  marker.appendChild(coin1Entity);

  const coin2Entity = document.createElement('a-entity');
  coin2Entity.setAttribute('id', 'model-coin2');
  coin2Entity.setAttribute('gltf-model', '#yellow-duck');
  coin2Entity.setAttribute('class', 'collectible');
  coin2Entity.setAttribute('position', '1 0 -3');
  coin2Entity.setAttribute('rotation', '0 0 0');
  coin2Entity.setAttribute('scale', '0.03 0.03 0.03');
  coin2Entity.setAttribute('aabb-collider', 'objects: a-gltf-model');
  coin2Entity.setAttribute('aabb-collider-listener', '');
  coin2Entity.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 5000');
  coin2Entity.setAttribute('coin-movement', { path: [[1, 0, -3], [0.5, 0, -2.5], [1, 0, -2], [1.5, 0, -2.5], [1.5, 0, -3.5], [1, 0, -4], [0.5, 0, -3.5], [1, 0, -3]], speed: 1 });

    marker.appendChild(coin2Entity);

  const coin3Entity = document.createElement('a-entity');
  coin3Entity.setAttribute('id', 'model-coin3');
  coin3Entity.setAttribute('gltf-model', '#yellow-duck');
  coin3Entity.setAttribute('class', 'collectible');
  coin3Entity.setAttribute('position', '1.5 0 -2');
  coin3Entity.setAttribute('rotation', '0 0 0');
  coin3Entity.setAttribute('scale', '0.03 0.03 0.03');
  coin3Entity.setAttribute('aabb-collider', 'objects: a-gltf-model');
  coin3Entity.setAttribute('aabb-collider-listener', '');
  coin3Entity.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 5000');
  coin3Entity.setAttribute('coin-movement', { path: [[1.5, 0, -2], [3, 0, -0.5], [3, 0, -2], [1.5, 0, -2]], speed: 1 });

    marker.appendChild(coin3Entity);
}


