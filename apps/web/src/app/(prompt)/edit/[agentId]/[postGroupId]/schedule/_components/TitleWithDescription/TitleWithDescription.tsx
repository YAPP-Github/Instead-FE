import { Text } from '@repo/ui';
import * as style from './TitleWithDescription.css';

type TitleWithDescriptionProps = {
  title: string;
  description: string;
};

export function TitleWithDescription({
  title,
  description,
}: TitleWithDescriptionProps) {
  return (
    <div className={style.textWrapperStyle}>
      <Text.H2 fontSize={28} fontWeight="bold" color="grey1000">
        {title}
      </Text.H2>
      <Text.P fontSize={18} fontWeight="medium" color="grey500">
        {description}
      </Text.P>
    </div>
  );
}
