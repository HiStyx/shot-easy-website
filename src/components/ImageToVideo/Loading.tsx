import React from 'react';

const Loading: React.FC = () => {
  const styles = {
    radialProgress: {
      '--value': '50',
      '--size': '48px',
      '--thickness': '4px',
      '--bg-color': 'rgba(33, 34, 35, 0.12)',
    } as React.CSSProperties,
    radialProgressBefore: {
      background: `
        radial-gradient(farthest-side, #39e86e 99%, #0000) top/var(--thickness)
        var(--thickness) no-repeat,
        conic-gradient(
          #39e86e,
          #4163f0 calc(var(--value) * 1%),
          var(--bg-color) 0
        )
      `
    },
    radialProgressAfter: {
      inset: 'calc(50% - var(--thickness) / 2)',
      transform: 'rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%))',
      backgroundColor: '#4163f0'
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-[#000c]">
      <div
        className="flex h-[132px] w-[132px] flex-col items-center justify-center rounded-2xl bg-white text-center xl:h-[156px] xl:w-[156px] xl:rounded-2.5xl"
        style={{ boxShadow: "0 0 16px 0 #2122230a" }}
      >
        <div className="radial-progress animate-spin" style={styles.radialProgress}></div>
        <div className="mt-2.5 text-sm text-[#21222366] xl:mt-5 xl:text-base">
          Processing ...
        </div>
      </div>
      <style>{`
        .radial-progress:before {
          ${Object.entries(styles.radialProgressBefore)
            .map(([key, value]) => `${key}: ${value};`)
            .join('\n')}
        }
        .radial-progress:after {
          ${Object.entries(styles.radialProgressAfter)
            .map(([key, value]) => `${key}: ${value};`)
            .join('\n')}
        }
        @media (min-width: 1200px) {
          .radial-progress {
            --size: 64px;
            --thickness: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
