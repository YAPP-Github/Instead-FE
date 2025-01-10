import { Icon } from '@repo/ui';
import { tokens } from '@repo/theme';
export default function Home() {
  return (
    <div>
      웹 1팀 파이팅!
      <Icon size={24} name="stack" type="stroke" />
      <Icon size={24} name="stack" type="fill" />
      <Icon
        size={24}
        name="stack"
        type="stroke"
        color={tokens.colors.warning300}
      />
    </div>
  );
}
