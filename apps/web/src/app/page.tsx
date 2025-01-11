import { Icon, Text } from '@repo/ui';
export default function Home() {
  return (
    <div>
      웹 1팀 파이팅!
      <Icon size={24} name="stack" type="stroke" />
      <Icon size={24} name="stack" type="fill" />
      <Icon size={24} name="stack" type="stroke" color="warning300" />
      <Text.h1 color="grey950" fontSize={28} fontWeight="semibold">
        hihi
      </Text.h1>
    </div>
  );
}
