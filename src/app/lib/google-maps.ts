import { key } from '../../../key';

function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    script.src = url;
    document.head.appendChild(script);
  });
}

let src = 'https://maps.googleapis.com/maps/api/js?';
src = `${src}&key=${key}`;

export const gmapsLoadPromise = loadScript(src)
  .then(() => (window as any).google.maps);

export function createMap(elem: any, options = {}) {
  return gmapsLoadPromise.then((gmaps: any) => {
    const map = new gmaps.Map(elem, options);
    return new Promise(resolve =>
      // projection_changed is used to avoid getting undefined from map.getProjection()
      gmaps.event.addListenerOnce(map, 'projection_changed', () => resolve(map)),
    );
  });
}
