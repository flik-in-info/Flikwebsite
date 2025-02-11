'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PanoramaViewer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    useEffect(() => {
        if (!containerRef.current) return;

        let scene: THREE.Scene;
        let isUserInteracting = false;
        let lon = 0, lat = 0, phi = 0, theta = 0;
        let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
        let onPointerDownLon = 0, onPointerDownLat = 0;

        function init() {
            if (!containerRef.current) return;

            const { clientWidth, clientHeight } = containerRef.current;

            camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 1, 1100);
            scene = new THREE.Scene();

            const geometry = new THREE.SphereGeometry(500, 60, 40);
            geometry.scale(-1, 1, 1);

            const texture = new THREE.TextureLoader().load('https://cdn.polyhaven.com/asset_img/primary/brown_photostudio_02.png?height=2160');
            texture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.MeshBasicMaterial({ map: texture });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(clientWidth, clientHeight);
            renderer.setAnimationLoop(animate);
            containerRef.current.appendChild(renderer.domElement);

            window.addEventListener('resize', onWindowResize);
            containerRef.current.addEventListener('pointerdown', onPointerDown);
            containerRef.current.addEventListener('touchstart', onTouchStart);
            containerRef.current.addEventListener('touchmove', onTouchMove);
            containerRef.current.addEventListener('touchend', onTouchEnd);
        }

        function onWindowResize() {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(clientWidth, clientHeight);
        }

        function onPointerDown(event: PointerEvent) {
            isUserInteracting = true;
            onPointerDownMouseX = event.clientX;
            onPointerDownMouseY = event.clientY;
            onPointerDownLon = lon;
            onPointerDownLat = lat;
            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onPointerUp);
        }

        function onPointerMove(event: PointerEvent) {
            if (!isUserInteracting) return;
            const speedMultiplier = 0.3; // Increased for faster movement
            lon = (onPointerDownMouseX - event.clientX) * speedMultiplier + onPointerDownLon;
            lat = (event.clientY - onPointerDownMouseY) * speedMultiplier + onPointerDownLat;
        }

        function onPointerUp() {
            isUserInteracting = false;
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
        }

        function onTouchStart(event: TouchEvent) {
            if (event.touches.length === 1) {
                isUserInteracting = true;
                onPointerDownMouseX = event.touches[0].clientX;
                onPointerDownMouseY = event.touches[0].clientY;
                onPointerDownLon = lon;
                onPointerDownLat = lat;
            }
        }

        function onTouchMove(event: TouchEvent) {
            if (!isUserInteracting || event.touches.length !== 1) return;
            event.preventDefault(); // Prevents page from scrolling while swiping
            lon = (onPointerDownMouseX - event.touches[0].clientX) * 0.4 + onPointerDownLon;
            lat = Math.max(-85, Math.min(85, (event.touches[0].clientY - onPointerDownMouseY) * 0.4 + onPointerDownLat)); // Constrain lat
        }

        function onTouchEnd() {
            isUserInteracting = false;
        }

        function animate() {
            if (!isUserInteracting) lon += 0.1;
            lat = Math.max(-85, Math.min(85, lat));
            phi = THREE.MathUtils.degToRad(90 - lat);
            theta = THREE.MathUtils.degToRad(lon);
            const x = 500 * Math.sin(phi) * Math.cos(theta);
            const y = 500 * Math.cos(phi);
            const z = 500 * Math.sin(phi) * Math.sin(theta);
            camera.lookAt(x, y, z);
            renderer.render(scene, camera);
        }

        init();
        return () => {
            window.removeEventListener('resize', onWindowResize);
            containerRef.current?.removeEventListener('pointerdown', onPointerDown);
            containerRef.current?.removeEventListener('touchstart', onTouchStart);
            containerRef.current?.removeEventListener('touchmove', onTouchMove);
            containerRef.current?.removeEventListener('touchend', onTouchEnd);
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
};

export default PanoramaViewer;
