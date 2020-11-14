//let saved = require("Storage").readJSON("ctxtimer.json",true) || {};
let saved = {};
function save() {
//    require("Storage").write("ctxtimer.json", saved);
}

function now() {
  return new Date().getTime();
}

let lastStart, lastEnd, start, end;

E.showMessage('ctx timer');

// 1: start
setWatch(() => {
  if(!start || end) {
    lastEnd = end;
    lastStart = start;
    end = null;
  } // else: just restarting
  start = now();
}, BTN1, {repeat:true});

// 2: end
setWatch(() => {
  if(start && !end) {
    end = now();
  }
}, BTN2, {repeat:true});

// 3: cancel
setWatch(() => {
  if(start) {
    start = null;
    if(end) {
      end = null;
    }
  }
}, BTN3, {repeat:true});

// interval to string
function iv2s(a, b, what) {
  if(!a || !b) return '';
  const d = (b-a)/1000;
  return (what||'') + (Number(d.toFixed(0)).toString()+'s');
}


function twodigit(a) {
  if(a>=10) return Number(a).toString();
  return '0' + Number(a).toString();
}

function walltime(a, what) {
  if(!a) return '';
  const d = new Date(a);
  const h = twodigit(d.getHours());
  const m = twodigit(d.getMinutes());
  const s = twodigit(d.getSeconds());
  return `${what||''}${h}:${m}:${s}`;
}

setInterval(() => {
  g.clear();
  const n = now();
  
  const stats = [
    walltime(n, ''),
    walltime(start, '@:'),
    iv2s(start, end||n, 'Dur:'),
    walltime(lastStart, 'P@:'),
    iv2s(lastStart, lastEnd, 'PDur:'),
    iv2s(lastEnd, start, 'Freq:'),
    iv2s(end, n, 'Quiet:')
  ].join('\n');
    
  E.showMessage('1: start\n2: stop\n3: cancel\n----\n' + stats);
  g.flip();
  
}, 1000);