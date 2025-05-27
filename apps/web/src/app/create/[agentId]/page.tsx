import Create from './Create';
import { CreatePageProps } from './types';

export default function CreatePage({ params }: CreatePageProps) {
  return <Create params={params} />;
}
