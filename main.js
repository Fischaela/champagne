document.addEventListener('DOMContentLoaded', (event) => {
  // Config
  const DEFAULT_NUMBER_OF_GLASSES = 3;

  const select = document.querySelector('#glasses');
  let numberOfGlasses = DEFAULT_NUMBER_OF_GLASSES;

  // Add event listeners
  select.addEventListener('change', (event) => {
    numberOfGlasses = event.target.value;
    deployGlassPyramid(numberOfGlasses)
  });

  deployGlassPyramid = (glasses) => {
    let result = glasses * glasses;
    let count = glasses;

    // Check if there is already a pyramid
    document.querySelectorAll('.level')
      .forEach((a) => {
        a.parentNode.removeChild(a);
      })

    // Render base level
    createLevel(result, count, 0);
    // Set camery position
    document.querySelector('#rig').setAttribute('position', '0 ' + count + ' ' + count)

    for (let i = 0, iMax = glasses; i < iMax; i += 1) {
      count = count - 1;

      if (count > 0) {
        result = result + (count * count);
        createLevel(result, count, 2 + (2 * i))
      } else if (count === 0) {
        document.querySelector('#result').innerHTML = result
      }
    }

  }

  const POSITION_X_Z = [
    [
      '0 0 0'
    ],
    [
      '-0.125 0 -0.125',
      '0.125 0 -0.125',
      '-0.125 0 0.125',
      '0.125 0 0.125'
    ],
    [
      '-0.25 0 -0.25',
      '0 0 -0.25',
      '0.25 0 -0.25',
      '-0.25 0 0',
      '0 0 0',
      '0.25 0 0',
      '-0.25 0 0.25',
      '0 0 0.25',
      '0.25 0 0.25'
    ],
    [
      '-0.375 0 -0.375',
      '-0.125 0 -0.375',
      '0.125 0 -0.375',
      '0.375 0 -0.375',
      '-0.375 0 -0.125',
      '-0.125 0 -0.125',
      '0.125 0 -0.125',
      '0.375 0 -0.125',
      '-0.375 0 0.125',
      '-0.125 0 0.125',
      '0.125 0 0.125',
      '0.375 0 0.125',
      '-0.375 0 0.375',
      '-0.125 0 0.375',
      '0.125 0 0.375',
      '0.375 0 0.375',
    ],
    [
      '-0.5 0 -0.5',
      '-0.25 0 -0.5',
      '0 0 -0.5',
      '0.25 0 -0.5',
      '0.5 0 -0.5',
      '-0.5 0 -0.25',
      '-0.25 0 -0.25',
      '0 0 -0.25',
      '0.25 0 -0.25',
      '0.5 0 -0.25',
      '-0.5 0 0',
      '-0.25 0 0',
      '0 0 0',
      '0.25 0 0',
      '0.5 0 0',
      '-0.5 0 0.25',
      '-0.25 0 0.25',
      '0 0 0.25',
      '0.25 0 0.25',
      '0.5 0 0.25',
      '-0.5 0 0.5',
      '-0.25 0 0.5',
      '0 0 0.5',
      '0.25 0 0.5',
      '0.5 0 0.5'
    ]
  ]

  createLevel = (result, count, y) => {
    const sceneElement = document.querySelector('a-scene');

    const containerEntity = document.createElement('a-entity')
    containerEntity.setAttribute('scale', '2 2 2')
    containerEntity.setAttribute('position', '0 ' + y + ' -4')
    containerEntity.setAttribute('class', 'level')
    
    for (let i = 0, iMax = count * count; i < iMax; i += 1) {
      let glass = document.createElement('a-entity');
      glass.setAttribute('gltf-model', '#glass');
      glass.setAttribute('scale', '0.1 0.1 0.1');
      glass.setAttribute('position', POSITION_X_Z[count - 1][i]);
      containerEntity.appendChild(glass)
    }

    sceneElement.appendChild(containerEntity)

  }

  deployGlassPyramid(numberOfGlasses);
})