import PressKitExplorer from '@/components/PressKitExplorer';
import { pressKitFiles } from '@/data/press-kit-manifest';

export default function PressKitPage() {
  return <PressKitExplorer files={pressKitFiles} />;
}
