export interface PressKitFile {
  displayName: string;
  size?: string;
  type: 'pdf' | 'image' | 'video' | 'other';
  path: string;
}

export const pressKitFiles: PressKitFile[] = [
  {
    displayName: 'Press Kit',
    size: '65 KB',
    type: 'pdf',
    path: 'Pocket Rave - Press kit.pdf',
  },
  {
    displayName: 'Technical Rider',
    size: '38 KB',
    type: 'pdf',
    path: 'Pocket Rave - Technical rider.pdf',
  },
  {
    displayName: 'Promo Video (30 sec)',
    size: '182 MB',
    type: 'video',
    path: 'Pocket Rave - Promo video(vertical, 30 sec).mp4',
  },
  {
    displayName: 'Photo 1',
    size: '2.1 MB',
    type: 'image',
    path: 'Pocket Rave - photo-1.jpg',
  },
  {
    displayName: 'Photo 2',
    size: '1.9 MB',
    type: 'image',
    path: 'Pocket Rave - photo-2.jpg',
  },
  {
    displayName: 'Photo 3',
    size: '3.4 MB',
    type: 'image',
    path: 'Pocket Rave - photo-3.jpg',
  },
  {
    displayName: 'Photo 4',
    size: '245 KB',
    type: 'image',
    path: 'Pocket Rave - photo-4.jpg',
  },
];
