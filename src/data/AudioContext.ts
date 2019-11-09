// polyfill for Safari
if (!window.AudioContext && window.webkitAudioContext) {
  const oldFunc = webkitAudioContext.prototype.decodeAudioData;
  webkitAudioContext.prototype.decodeAudioData = function(arraybuffer: ArrayBuffer) {
    return new Promise((resolve, reject) => {
      oldFunc.call(this, arraybuffer, resolve, reject);
    });
  };
}

// A wise man once said "you should probably wrap this in a try catch"
export const ctx = new (window.AudioContext || window.webkitAudioContext)();
