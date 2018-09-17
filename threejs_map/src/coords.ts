import {Vector2, Vector3, Plane, Camera, Raycaster} from "three"
import { QR } from './interfaces';

const Z_PLANE = new Plane(new Vector3(0, 0, 1), 0)

export function qrToWorld(q: number, r: number, scale = 1.0): Vector3 {
    return new Vector3(Math.sqrt(3) * (q + r / 2) * scale, (3 / 2) * r * scale, 0)
}

export function qrToWorldX(q: number, r: number, scale = 1.0) {
    return Math.sqrt(3) * (q + r / 2) * scale
}

export function qrToWorldY(q: number, r: number, scale = 1.0) {
    return (3 / 2) * r * scale
}

export function qrDistance(a: QR, b: QR) {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
}

export function pickingRay(vector: Vector3, camera: Camera): Raycaster {
    // set two vectors with opposing z values
    vector.z = -1.0;
    var end = new Vector3(vector.x, vector.y, 1.0);
    
    vector.unproject(camera);
    end.unproject(camera);

    // find direction from vector to end
    end.sub(vector).normalize();
    return new Raycaster(vector, end);
}

/**
 * Transforms mouse coordinates into world space, assuming that the game view spans the entire window.
 */
export function mouseToWorld(e: MouseEvent | {clientX: number, clientY: number}, camera: Camera): Vector3 {
  const mv = new Vector3((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0.5 )
  const raycaster = pickingRay(mv, camera);
  return raycaster.ray.intersectPlane(Z_PLANE,null)
}

/**
 * Transforms screen coordinates into world space, assuming that the game view spans the entire window.
 */
export function screenToWorld(x: number, y: number, camera: Camera): Vector3 {
    const mv = new Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5 );
    const raycaster = pickingRay(mv, camera);
    return raycaster.ray.intersectPlane(Z_PLANE,null)
}

/**
 * Transforms world coordinates into screen space.
 */
export function worldToScreen(pos: Vector3, camera: Camera): Vector3 {
    var v = pos.clone()
    v.project(camera)
    v.x = window.innerWidth/2 + v.x * (window.innerWidth/2)
    v.y = window.innerHeight/2 - v.y * (window.innerHeight/2)

    return v
}

export function axialToCube(q: number, r: number) {    
    return { x: q, y: -q-r, z: r}
}

export function cubeToAxial(x: any, y: number, z: number) {    
    return { q: x, r: z }
}

/**
 * Rounds fractal cube coordinates to the nearest full cube coordinates.
 * @param cubeCoord
 * @returns {{x: number, y: number, z: number}}
 */
export function roundToHex(cubeCoord: {x: number, y: number, z:number}) {
    var x = cubeCoord.x, y = cubeCoord.y, z = cubeCoord.z
    var rx = Math.round(x)
    var ry = Math.round(y)
    var rz = Math.round(z)

    var x_diff = Math.abs(rx - x)
    var y_diff = Math.abs(ry - y)
    var z_diff = Math.abs(rz - z)

    if (x_diff > y_diff && x_diff > z_diff) rx = -ry-rz
    else if (y_diff > z_diff) ry = -rx-rz
    else rz = -rx-ry

    return {x: rx, y: ry, z: rz}
}