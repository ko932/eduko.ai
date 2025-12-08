import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ThreeTutorStage({ peer }){
  const mountRef = useRef();

  useEffect(()=> {
    const mount = mountRef.current;
    if(!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0,1.6,2.5);

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5,10,7.5);
    scene.add(dir);

    // ground plane subtle
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10), new THREE.MeshStandardMaterial({color:0x071133, opacity:0.0, transparent:true}));
    plane.rotation.x = -Math.PI/2;
    plane.position.y = 0;
    scene.add(plane);

    const loader = new GLTFLoader();
    const avatarUrl = import.meta.env.VITE_AVATAR_URL || '/assets/default_tutor.glb';

    let model = null;
    loader.load(avatarUrl, (gltf) => {
      model = gltf.scene;
      model.position.set(0,0,-0.2);
      model.scale.set(1.1,1.1,1.1);
      scene.add(model);
    }, undefined, (err) => {
      console.error('GLTF load error', err);
    });

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if(model) {
        model.rotation.y = Math.sin(t * 0.2) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [peer]);

  return <div ref={mountRef} style={{width:'100%', height:'100%'}} />;
}
