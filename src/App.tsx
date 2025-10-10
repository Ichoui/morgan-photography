import React, { useEffect, useState } from 'react';
import { Block, Exif } from 'interfaces/global.interface';
import { PhotoGallery } from 'components/Gallery/Gallery';
import { galleryBlocks } from 'scripts/gallery.exif';
import { AnimatedSprite, Application, Assets, Sprite, Texture } from 'pixi.js';

const App = (): React.JSX.Element => {
  const [images, setImages] = useState<Exif[]>([]);
  const [galleryId, setGalleryId] = useState<string>('');
  const [galleryName, setGalleryName] = useState<string>('');
  const [isGallery, setIsGallery] = useState<boolean>(false);
  const blocks: Block[] = galleryBlocks //
    .sort((a, b): number => b.date.getTime() - a.date.getTime()); // Tri du plus récent au moins récent

  const selectGallery = (block: Block): void => {
    fetch(block.jsonPath)
      .then(res => res.json())
      .then(exifs => exifState(exifs, block.identifier, true, block.name));
  };

  const exifState = (exifs: Exif[], id: string, gallery: boolean, name: string): void => {
    setImages(exifs);
    setGalleryId(id);
    setIsGallery(gallery);
    setGalleryName(name);
  };
  /*useEffect(() => {
    const loadAnimTest = async () => {
      // Create a new application
      const app = new Application();

      // Initialize the application
      await app.init({ autoStart: false, resizeTo: window });

      // Append the application canvas to the document body
      document.getElementById('cc')?.appendChild(app.canvas);
      // Load the animation sprite sheet
      const spritesheet = await Assets.load('https://pixijs.com/assets/spritesheet/0123456789.json');

      // Create an array to store the textures
      const textures = [];
      let i;

      for (i = 0; i < 10; i++) {
        const framekey = `0123456789 ${i}.ase`;
        const texture = Texture.from(framekey);
        const time = spritesheet.data.frames[framekey].duration;

        textures.push({ texture, time });
      }

      const scaling = 4;

      // Create a slow AnimatedSprite
      const slow = new AnimatedSprite(textures);

      slow.anchor.set(0.5);
      slow.scale.set(scaling);
      slow.animationSpeed = 0.5;
      slow.x = (app.screen.width - slow.width) / 2;
      slow.y = app.screen.height / 2;
      slow.play();
      app.stage.addChild(slow);

      // Create a fast AnimatedSprite
      const fast = new AnimatedSprite(textures);

      fast.anchor.set(0.5);
      fast.scale.set(scaling);
      fast.x = (app.screen.width + fast.width) / 2;
      fast.y = app.screen.height / 2;
      fast.play();
      app.stage.addChild(fast);

      // Start animating
      app.start();
    };
    const loadAnimBlockWorking = async () => {
      // Create a new application
      const app = new Application();

      // Initialize the application
      await app.init({ autoStart: false, backgroundColor: '#282c34', resizeTo: window });

      // Append the application canvas to the document body
      document.getElementById('is-not-gallery')?.appendChild(app.canvas);
      console.log(blocks);
      blocks.map(async (block, i) => {
        const texture = await Assets.load(block.blockThumbnail);
        const sprite = new Sprite(texture);

        // Calcul position
        const col = i % cols;
        const row = Math.floor(i / cols);
        sprite.x = col * (thumbSize + gap) + thumbSize / 2 + 100;
        sprite.y = row * (thumbSize + gap) + thumbSize / 2 + 100;

        // Taille fixe
        sprite.width = thumbSize;
        // sprite.height = thumbSize;

        // Effet visuel léger
        sprite.alpha = 0.9;
        sprite.angle = Math.random() * 2 - 1; // un chouïa de rotation

        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';
        sprite.on('pointertap', () => {
          console.log('Clicked:', block.blockThumbnail);
          // 👉 ici tu peux déclencher une anim, ouvrir un modal/lightbox, etc.
          selectGallery(block);
        });

        app.stage.addChild(sprite);
      });

      app.ticker.add(() => {
        app.stage.children.forEach((child, i) => {
          child.alpha = 0.9 + Math.sin(Date.now() / 1000 + i) * 0.5;
        });
      });

      // Start animating
      app.start();
    };
    const loadAnim = async () => {
      // Create a new application
      const app = new Application();

      // Initialize the application
      await app.init({ autoStart: false, resizeTo: window });

      // Append the application canvas to the document body

      blocks.map(async (block, index) => {
        document.getElementById('block-' + index)?.appendChild(app.canvas);
        const texture = await Assets.load(block.blockThumbnail);
        const sprite = new Sprite(texture);

        // // Calcul position
        // const col = i % cols;
        // const row = Math.floor(i / cols);
        // sprite.x = col * (thumbSize + gap) + thumbSize / 2 + 100;
        // sprite.y = row * (thumbSize + gap) + thumbSize / 2 + 100;
        //
        // // Taille fixe
        // sprite.width = thumbSize;
        // // sprite.height = thumbSize;
        //
        // // Effet visuel léger
        // sprite.alpha = 0.9;
        // sprite.angle = Math.random() * 2 - 1; // un chouïa de rotation

        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';
        sprite.on('pointertap', () => {
          console.log('Clicked:', block.blockThumbnail);
          // 👉 ici tu peux déclencher une anim, ouvrir un modal/lightbox, etc.
          selectGallery(block);
        });

        app.stage.addChild(sprite);
      });

      // app.ticker.add(() => {
      //   app.stage.children.forEach((child, i) => {
      //     child.alpha = 0.9 + Math.sin(Date.now() / 1000 + i) * 0.5;
      //   });
      // });

      // Start animating
      app.start();
    };

    //loadAnim();
  }, [isGallery]);
*/
  useEffect(() => {
    blocks.map((block, index) => {
      const canvas = document.getElementById(`block-${index}`) as HTMLCanvasElement;
      if (canvas) attachPixi(canvas, block);
    });
  }, [isGallery]);

  const attachPixi = async (canvas: HTMLCanvasElement, block) => {
    const loadAnim = async () => {
      // Create a new application
      const app = new Application();

      // Initialize the application
      // await app.init({ autoStart: false, resizeTo: window });
      await app.init({ canvas, width: canvas.clientWidth, height: canvas.clientHeight });

      // Append the application canvas to the document body
      // document.getElementById('block-' + index)?.appendChild(app.canvas);
      const texture = await Assets.load(block.blockThumbnail);
      const sprite = new Sprite(texture);
      app.stage.addChild(sprite);

      sprite.anchor.set(0.5);
      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2;
      sprite.width = app.screen.width;
      sprite.height = app.screen.height;

      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';

      canvas.style.border = '1px solid white';
      canvas.style.transition = 'transform 1s';
      canvas.style.borderRadius = '10px';
      sprite.on('pointerenter', () => {
        canvas.style.transform = 'scale(1.2)';
        // faire ca avec la width et height du border
        // o uessayer avec le inner ?
      });
      sprite.on('pointerleave', () => {
        canvas.style.transform = 'scale(1)';
      });
      sprite.on('pointertap', () => {
        console.log('Clicked:', block.blockThumbnail);
      });

      app.ticker.add(() => {
        // sprite.rotation += 0.03;
        app.stage.children.forEach((child, i) => {
          // child.alpha = 0.9 + Math.sin(Date.now() / 1000 + i) * 0.1;
          // sprite.alpha = 0.9;
        });
      });

      // Start animating
      app.start();
    };
    await loadAnim();
  };

  return (
    <div className='App'>
      <header>
        <div className='site-name'>
          <img src='/assets/svg/logo.svg' className='logo' alt='logo' />
        </div>
      </header>

      <div className='container'>
        {!isGallery && (
          <div className='grid-block'>
            {blocks.map((block, index) => (
              <div key={index} className='outer-block' /*onClick={() => selectGallery(block)}*/>
                <div className='border-block'>
                  <canvas id={'block-' + index} className='block' aria-label={block.identifier}>
                    {/*<img src={block.blockThumbnail} alt={block.identifier} />*/}
                    <span> {block.name} </span>
                  </canvas>
                </div>
              </div>
            ))}
          </div>
        )}
        {/*{!isGallery && <div id='is-not-gallery'></div>}*/}
        {isGallery && (
          <div className='wrapper-photo-gallery'>
            <div className='title-zone'>
              {/*<div className='left'>*/}
              <button className='btn-back' onClick={() => exifState([], '', false, '')}>
                <img src='/assets/svg/chevron-left.svg' alt='retour' />
                <span>RETOUR</span>
              </button>
              {/*</div>*/}
              <span className='gallery-name'>{galleryName}</span>
            </div>
            <PhotoGallery galleryId={galleryId} images={images} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
