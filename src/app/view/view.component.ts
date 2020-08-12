import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-view',
  template: `<canvas #canvas></canvas>`,
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  el: ElementRef;

  renderer: THREE.WebGLRenderer;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const canvas = this.el.nativeElement;
    const { width, height } = canvas.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({canvas});

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.render(scene, camera);
  }

}
