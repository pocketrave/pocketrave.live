/**
 * Press kit files served from /assets/press-kit/
 * Add new entries here when adding files to the folder.
 */
export interface PressKitFile {
  filename: string;
  displayName: string;
  size?: string;
  type: 'pdf' | 'image' | 'other';
}

export const pressKitFiles: PressKitFile[] = [
  {
    filename: 'technical rider.pdf',
    displayName: 'Technical Rider',
    size: '26 KB',
    type: 'pdf',
  },
  {
    filename: 'DSCF7739.jpg',
    displayName: 'DSCF7739',
    size: '3.4 MB',
    type: 'image',
  },
  {
    filename: 'photo_2_2024-12-11_22-27-44.jpg',
    displayName: 'Photo 2024-12-11',
    size: '245 KB',
    type: 'image',
  },
];
