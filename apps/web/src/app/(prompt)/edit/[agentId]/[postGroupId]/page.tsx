import Edit from './Edit';
import type { EditPageProps } from './types';

export default function EditPage({ params }: EditPageProps) {
  return <Edit agentId={params.agentId} postGroupId={params.postGroupId} />;
}
