import * as G from './Gloable'


var biggerGeometry = new THREE.BoxGeometry(G.BLOCK.radius * 2 + 0.02, G.BLOCK.height + 0.04, G.BLOCK.radius * 2 + 0.02);
var staticGeometry = new THREE.BoxGeometry(G.BLOCK.radius * 2, G.BLOCK.height, G.BLOCK.radius * 2);
var shadowGeometry = new THREE.PlaneGeometry(11, 11);
var stripeMaterial = new THREE.MeshBasicMaterial({ map: G.loader.load('res/stripe.png') });
var customMaterial = G.GAME.canShadow ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial;

var colors = {
	green: 0x619066,
	white: 0xeeeeee,
	lightGreen: 0x7ba980,
	gray: 0x9e9e9e,
	black: 0x6d6d6d,
	lightGray: 0xdbdbdb,
	lightBlack: 0xcbcbcb,
	brown: 0x676767,
	middleLightGreen: 0x774a379,
	middleLightGray: 0xbbbbbb,
	middleLightBlack: 0x888888
};


class Block {
    constructor(type,num){

        this.radius = G.BLOCK.radius;
		this.status = 'stop';
		this.scale = 1;
		this.type = 'green';
		this.types = ['green', 'black', 'gray'];
        this.radiusScale = 1;
        this.obj = new THREE.Object3D();
		this.obj.name = 'block';
		this.body = new THREE.Object3D();
		if (type <= 8 || type == 27) {
			this.greenMaterial = new THREE.MeshLambertMaterial({ color: colors.green });
			this.whiteMaterial = new THREE.MeshLambertMaterial({ color: colors.white });
		}
        this.shadowWidth = 11;
        if (type == 2 || type == 7) {
			this.shadow = new THREE.Mesh(shadowGeometry, G.desk_shadow);
			this.shadow.position.set(0, -G.BLOCK.height / 2 - 0.001 * type, -4.5);
			this.shadow.scale.y = 1.2;
		} else if (type == 3 || type == 21 || type == 27 || type == 28 || type == 29 || type == 31) {
			this.shadow = new THREE.Mesh(shadowGeometry, G.cylinder_shadow);
			this.shadow.position.set(-0.1, -G.BLOCK.height / 2 - 0.001 * type, -2.8);
			this.shadow.scale.y = 1.4;
			this.shadow.scale.x = 1;
		} else {
			this.shadow = new THREE.Mesh(shadowGeometry, G.shadow);
			this.shadow.position.set(-0.74, -G.BLOCK.height / 2 - 0.001 * type, -2.73);
			this.shadow.scale.y = 1.4;
        }
        this.shadow.rotation.x = -Math.PI / 2;
		this.order = type;
		this.radiusSegments = 4;
		this.height = G.BLOCK.height;
		this.canChange = true;

    }

      merge(totalGeometry, geometry, index, positions) {
        for (var i = 0, len = geometry.faces.length; i < len; ++i) {
            geometry.faces[i].materialIndex = 0;
        }
        var mesh = new THREE.Mesh(geometry);
        for (var i = 0, len = positions.length; i < len; ++i) {
            mesh.position.set(positions[i].x, positions[i].y, positions[i].z);
            mesh.updateMatrix();
            totalGeometry.merge(mesh.geometry, mesh.matrix, index);
        }
    }
    mapUv(textureWidth, textureHeight, geometry, faceIdx, x1, y1, x2, y2, flag) {
        var tileUvW = 1 / textureWidth;
        var tileUvH = 1 / textureHeight;
        if (geometry.faces[faceIdx] instanceof THREE.Face3) {
            var UVs = geometry.faceVertexUvs[0][faceIdx * 2];
            if (faceIdx == 4 && !flag) {
                UVs[0].x = x1 * tileUvW;UVs[0].y = y1 * tileUvH;
                UVs[2].x = x1 * tileUvW;UVs[2].y = y2 * tileUvH;
                UVs[1].x = x2 * tileUvW;UVs[1].y = y1 * tileUvH;
            } else {
                UVs[0].x = x1 * tileUvW;UVs[0].y = y1 * tileUvH;
                UVs[1].x = x1 * tileUvW;UVs[1].y = y2 * tileUvH;
                UVs[2].x = x2 * tileUvW;UVs[2].y = y1 * tileUvH;
            }
            var UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1];
            if (faceIdx == 4 && !flag) {
                UVs[2].x = x1 * tileUvW;UVs[2].y = y2 * tileUvH;
                UVs[1].x = x2 * tileUvW;UVs[1].y = y2 * tileUvH;
                UVs[0].x = x2 * tileUvW;UVs[0].y = y1 * tileUvH;
            } else {
                UVs[0].x = x1 * tileUvW;UVs[0].y = y2 * tileUvH;
                UVs[1].x = x2 * tileUvW;UVs[1].y = y2 * tileUvH;
                UVs[2].x = x2 * tileUvW;UVs[2].y = y1 * tileUvH;
            }
        }
    }
    getBox() {
        if (this.boundingBox) return this.boundingBox;
        this.boundingBox = new THREE.Box3().setFromObject(this.body);
        return this.boundingBox;
    }
    glow() {
        this.hitObj.material.map = this.glowMap;
    }
    openDoor() {
        _animation.customAnimation.to(this.door.position, 1, { z: -4.5 });
        _animation.customAnimation.to(this.secondDoor.position, 1, { z: -0.5 });
    }

};