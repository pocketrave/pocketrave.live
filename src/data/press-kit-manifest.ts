/**
 * Press kit files served from /assets/press-kit/
 * Add new entries here when adding files to the folder.
 */
export interface PressKitFile {
  displayName: string;
  size?: string;
  type: 'pdf' | 'image' | 'video' | 'other';
  /** External URL; when set, download opens this link instead of local file */
  url?: string;
  /** Local path for files in /assets/press-kit/ (e.g. 'technical rider.pdf') */
  path?: string;
}

/*
https://drive.usercontent.google.com/u/0/uc?id=15mlvb5pjHOiJ2G9vVA5Ujz0_Tqwcyu6f&export=download 
https://drive.usercontent.google.com/u/0/uc?id=185woxQ2-cOrERSa2kySldt7cvAcSyRlq&export=download 
https://drive.usercontent.google.com/u/0/uc?id=1d2pzQb5x7l_InvGMBI-KBzAjrlS4lwoO&export=download 
https://drive.usercontent.google.com/u/0/uc?id=1AUCZAOtMWDUUVr484eSACt61uD1PhV-q&export=download 
https://drive.usercontent.google.com/u/0/uc?id=1ve7XqtIJEm7VHhfdsxYzTFMC65fIx2m3&export=download 
https://drive.usercontent.google.com/u/0/uc?id=1H5uAkCWz0zfBs33vZPBpnivvijrlyiy4&export=download 
*/

export const pressKitFiles: PressKitFile[] = [
  {
    displayName: 'Technical Rider',
    size: '26 KB',
    type: 'pdf',
    path: 'technical rider.pdf',
  },
  {
    displayName: 'promo 30sec (2026 live at Props)',
    size: '182 MB',
    type: 'video',
    url: 'https://drive.usercontent.google.com/download?id=1x4bFB7qnrTRmviJa07vGXUUDf-R350hy&confirm=t&export=download',
  },
  {
    displayName: 'DSCF5777',
    size: '3.4 MB',
    type: 'image',
    url: 'https://drive.usercontent.google.com/u/0/uc?id=15mlvb5pjHOiJ2G9vVA5Ujz0_Tqwcyu6f&export=download',
  },
  {
    displayName: 'DSCF5823',
    size: '245 KB',
    type: 'image',
    url: 'https://drive.usercontent.google.com/u/0/uc?id=185woxQ2-cOrERSa2kySldt7cvAcSyRlq&export=download',
  },
  {
    displayName: 'DSCF6142',
    size: '399 KB',
    type: 'image',
    url: 'https://drive.usercontent.google.com/u/0/uc?id=1d2pzQb5x7l_InvGMBI-KBzAjrlS4lwoO&export=download',
  },
  {
    displayName: 'DSCF5891',
    size: '157 KB',
    type: 'image',
    url: 'https://drive.usercontent.google.com/u/0/uc?id=1AUCZAOtMWDUUVr484eSACt61uD1PhV-q&export=download',
  },
  {
    displayName: 'DSCF6012',
    size: '153 KB',
    type: 'image',
    url: 'https://drive.usercontent.google.com/u/0/uc?id=1ve7XqtIJEm7VHhfdsxYzTFMC65fIx2m3&export=download',
  },
  {
    displayName: 'DSCF5955',
    size: '16 MB',
    type: 'image',
    url: 'https://drive.usercontent.google.com/u/0/uc?id=1H5uAkCWz0zfBs33vZPBpnivvijrlyiy4&export=download',
  },
];
